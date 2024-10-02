const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

// Importing models
const Course = require('../models/courses');
const Content = require('../models/content');
const User = require('../models/user');

// @desc   Get all courses
// @route  GET /courses
// @access Public
const getCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find().exec();

    // Check if courses is empty
    if (courses.length === 0) {
        res.status(404).json({ message: 'No courses found' });
    }

    res.status(200).json(courses);
});

// @desc   Get one course
// @route  GET /courses/oneCourse
// @access Public
const getOneCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;

    // Check if courseId is empty
    if (!courseId) {
        res.status(400);
        throw new Error('Course ID is required');
    }

    // Checkk if the course exists
    const course = await Course.findOne({ title }).collation({ locale: 'en', strength: 2 }).exec();
    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    res.status(200).json(courseId);
})

// @desc   Create course
// @route  POST /courses/create
// @access Private
const createCourse = asyncHandler(async (req, res) => {
    const { title, description, tutor, category, status, thumbnail } = req.body;

    // Check if all the fields are given
    if (!title || !description || !tutor || !mongoose.Types.ObjectId.isValid(tutor) || !thumbnail || !category) {
        res.status(400);
        throw new Error('All fields are required and tutor should be mongoose object id.');
    }

    // Check if the tutor is authorized
    const foundTutor = await User.findById(tutor).exec();
    if (!foundTutor) {
        res.status(403);
        throw new Error('You are not authorized to create a course');
    }

    // Check if the course already exists
    const courseExists = await Course.findOne({ title }).exec();
    if (courseExists) {
        res.status(400);
        throw new Error('Course already exists');
    }

    // Create new course
    const newCourse = new Course({
        title,
        description,
        tutor,
        category,
        status: status ? status : 'ongoing',
        thumbnail,
        tutorName: foundTutor.name,
        tutorAvatar: foundTutor.avatar
    });
    await newCourse.save();

    res.status(201).json(newCourse);
})

// @desc   Update course
// @route  PUT /courses/update
// @access Private
const updateCourse = asyncHandler(async (req, res) => {
    const { courseId, title, description, category, status, thumbnail, content } = req.body;

    // Check if courseId is empty
    if (!courseId) {
        res.status(400);
        throw new Error('Course ID is required');
    }

    // Check if the content is in valid format
    if (content && !Array.isArray(content) && content.length > 0 && !content.every(item => mongoose.Types.ObjectId.isValid(item))) {
        res.status(400);
        throw new Error('Content should be an array of mongoose object ids.');
    }

    // Check if the course exists
    const updatedCourse = await Course.findById(courseId).exec();
    if (!updatedCourse) {
        res.status(404);
        throw new Error('Course not found');
    }

    // Check if the course title already exists
    if (title) {
        const courseExists = await Course.findOne({ title }).exec();
        if (courseExists && courseExists._id.toString() !== courseId) {
            res.status(400);
            throw new Error('Course already exists');
        }
    }

    // Check if the tutor is authorized
    const foundTutor = await User.findOne({ email: req.email }).collation({ locale: 'en', strength: 2 }).exec();
    if (!foundTutor || foundTutor._id.toString() !== updatedCourse.tutor.toString() || (!req.roles.includes('tutor') && !req.roles.includes('admin'))) {
        res.status(403);
        throw new Error('You are not authorized to update this course');
    }

    // Update course
    updatedCourse.title = title ? title : updatedCourse.title;
    updatedCourse.description = description ? description : updatedCourse.description;
    updatedCourse.category = category ? category : updatedCourse.category;
    updatedCourse.status = status ? status : updatedCourse.status;
    updatedCourse.thumbnail = thumbnail ? thumbnail : updatedCourse.thumbnail;
    updatedCourse.content = content ? [...updatedCourse.content, content] : updatedCourse.content;
    await updatedCourse.save();

    res.status(200).json(updatedCourse);
})

// @desc   Delete course
// @route  DELETE /courses/delete
// @access Private
const deleteCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.body;

    // Check if courseId is empty
    if (!courseId) {
        res.status(400);
        throw new Error('Course ID is required');
    }

    // Check if the course exists
    const course = await Course.findById(courseId).exec();
    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    // Check if the user is authorized to delete the course
    const foundTutor = await User.findById(course.tutor).collation({ locale: 'en', strength: 2 }).exec();
    if (!req.roles.includes('admin') && req.email !== foundTutor.email) {
        res.status(403);
        throw new Error('You are not authorized to delete this course');
    }

    // Delete course content
    const contentArray = course.content;
    if (contentArray.length > 0) {
        contentArray.forEach(async item => {
            await Content.findByIdAndDelete(item).exec();
        })
    }

    // Delete course
    await course.deleteOne();

    res.status(204).json({ message: 'No content' });
})

module.exports = {
    getCourses,
    getOneCourse,
    createCourse,
    updateCourse,
    deleteCourse
}