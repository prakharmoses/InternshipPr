const asyncHandler = require('express-async-handler');

// Importing models
const Course = require('../models/courses');
const Content = require('../models/content');
const User = require('../models/user');

// @desc   Get all courses
// @route  GET /courses
// @access Public
const getCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find().exec();
    res.status(200).json(courses);
});

// @desc   Get one course
// @route  GET /courses/oneCourse
// @access Public
const getOneCourse = asyncHandler(async (req, res) => {
    const { title } = req.body;
    const course = await Course.findOne
        ({ title }).exec();
    res.status(200).json(course);
})

// @desc   Create course
// @route  POST /courses/create
// @access Private
const createCourse = asyncHandler(async (req, res) => {
    const { title, description, tutor, price } = req.body;
    const newCourse = new Course({
        title,
        description,
        tutor,
        price,
    });
    await newCourse.save();
    res.status(201).json(newCourse);
})

// @desc   Update course
// @route  PUT /courses/update
// @access Private
const updateCourse = asyncHandler(async (req, res) => {
    const { title, description, tutor, price } = req.body;
    const updatedCourse = await Course.findOne({ title }).exec();
    updatedCourse.description = description;
    updatedCourse.tutor = tutor;
    updatedCourse.price = price;
    await updatedCourse.save();
    res.status(200).json(updatedCourse);
})

// @desc   Delete course
// @route  DELETE /courses/delete
// @access Private
const deleteCourse = asyncHandler(async (req, res) => {
    const { title } = req.body;
    await Course.findOneAndDelete({ title }).exec();
    res.status(204).json({ message: 'No content' });
})

module.exports = {
    getCourses,
    getOneCourse,
    createCourse,
    updateCourse,
    deleteCourse
}