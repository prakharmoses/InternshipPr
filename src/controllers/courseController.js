const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

// Importing models
const Course = require('../models/courses');
const Content = require('../models/content');
const User = require('../models/user');
const Tutor = require('../models/tutor');
const Company = require('../models/company');

// @desc   Get all courses
// @route  GET /courses
// @access Public
const getCourses = asyncHandler(async (req, res) => {
    const { number } = req.params;
    
    const courses = await Course.aggregate([
        {
            $addFields: {
                contentCount: { $size: "$content" }
            }
        },
        {
            $sort: { createdAt: -1 }
        },
        {
            $project: {
                id: '$_id',
                title: 1,
                tutorName: 1,
                tutorImg: '$tutorAvatar',
                thumbImg: '$thumbnail',
                contentCount: 1,
                date: '$createdAt',
                category: 1,
                status: 1
            }
        },
        {
            $limit: parseInt(number)
        }
    ])

    // Check if no courses are found
    if (courses.length === 0) {
        res.status(404)
        throw new Error('No courses found');
    }

    res.status(200).json(courses);
});

// @desc   Get total courses
// @route  GET /courses/totalCourses
// @access Public
const getTotalCourses = asyncHandler(async (req, res) => {
    const totalCourses = await Course.find().countDocuments().exec();

    // Check if no courses are found
    if (totalCourses === 0) {
        return res.status(404).json({ message: 'No courses found' });
    }

    res.status(200).json({ totalCourses });
})

// @desc  Get top courses
// @route GET /courses/topCourses/:number
// @access Public
const getTopCourses = asyncHandler(async (req, res) => {
    // Parse `number` from the URL params and convert it to an integer
    const number = Math.min(parseInt(req.params.number, 10), 10);

    // Check if number is empty
    if (!number || !Number.isInteger(number) || isNaN(number) || number < 1 || number % 1 !== 0) {
        res.status(400);
        throw new Error('Number is required and should be an integer less than 10');
    }

    // Get top courses
    const courses = await Course.aggregate([
        {
            $addFields: {
                savedByCount: { $size: "$savedBy" },
                contentCount: { $size: "$content" }
            }
        },
        {
            $sort: { savedByCount: -1 }
        },
        {
            $project: {
                _id: 1,
                title: 1,
                tutor: 1,
                tutorAvatar: 1,
                tutorName: 1,
                thumbnail: 1,
                createdAt: 1,
                contentCount: 1,
            }
        },
        {
            $limit: number
        }
    ])

    // Check if courses is empty
    if (courses.length === 0) {
        return res.status(404).json({ message: 'No courses found' });
    }

    res.status(200).json(courses);
})

// @desc   Get one course
// @route  GET /courses/getOneCourse/:courseId
// @access Public
const getOneCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;

    // Check if courseId is empty
    if (!courseId) {
        res.status(400);
        throw new Error('Course ID is required');
    }

    // Checkk if the course exists
    const courseDetails = await Course.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(courseId) }
        },
        {
            $project: {
                id: '$_id',
                title: 1,
                description: 1,
                tutorId: '$tutor',
                tutorName: 1,
                tutorImg: '$tutorAvatar',
                thumbImg: '$thumbnail',
                content: 1,
                date: '$createdAt',
                saved: { $in: [new mongoose.Types.ObjectId(req.userId), '$savedBy'] },
            }
        }
    ]);

    // Check if courseDetails is empty
    if (courseDetails.length === 0) {
        res.status(404);
        throw new Error('Course not found');
    }

    res.status(200).json(courseDetails[0]);
})

// @desc   Create course
// @route  POST /courses/add
// @access Private
const createCourse = asyncHandler(async (req, res) => {
    const { title, description, tutor, category, thumbnail } = req.body;

    // Check if all the fields are given
    if (!title || !description || !tutor || !mongoose.Types.ObjectId.isValid(tutor) || !thumbnail || !category) {
        res.status(400);
        throw new Error('All fields are required and tutor should be mongoose object id.');
    }

    // Check if the tutor is authorized
    const foundTutor = await Tutor.findById(tutor).exec();
    const foundUser = await User.findById(tutor).exec();
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

    // Update course category in company
    const foundCompany = await Company.findById(`${process.env.COMPANY_ID}`).exec();
    if (!foundCompany.category) {
        foundCompany.category = [];
    }
    if (!foundCompany.category.includes(category)) {
        foundCompany.category.push(category);
    }
    await foundCompany.save();

    // Create new course
    const newCourse = new Course({
        title,
        description,
        tutor,
        category,
        thumbnail,
        tutorName: foundUser.name,
        tutorAvatar: foundUser.avatar
    });
    await newCourse.save();

    // Add course to tutor's courses
    if (!foundTutor.courses) {
        foundTutor.courses = [];
    }
    foundTutor.courses.push(newCourse._id);
    await foundTutor.save();

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

// @desc   Save course
// @route  PATCH /courses/saveCourse/:courseId
// @access Private
const saveCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;

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

    // Check if the course is already saved
    const user = await User.findById(req.userId).exec();
    if (!user) {
        res.status(400);
        throw new Error('User does not exist!');
    }

    if (user.saved.includes(courseId)) {
        // Remove course
        user.saved = user.saved.filter(item => item.toString() !== courseId.toString());
        await user.save();

        // Remove user from course's savedBy
        course.savedBy = course.savedBy.filter(item => item.toString() !== req.userId.toString());
        await course.save();

        res.status(200).json({ message: false });
    } else {
        // Save course
        user.saved.push(courseId);
        await user.save();

        // Add user to course's savedBy
        course.savedBy.push(req.userId);
        await course.save();

        res.status(200).json({ message: true });
    }
})

// @desc   Get saved courses
// @route  GET /courses/getSavedCourses/:userId
// @access Private
const getSavedCourses = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // Check if userId is empty
    if (!userId) {
        res.status(400);
        throw new Error('User ID is required');
    }

    // Check if saved courses are present
    const foundUserPlaylist = await User.findById(userId).select('saved').exec();
    if (!foundUserPlaylist || foundUserPlaylist.saved.length === 0) {
        res.status(404);
        throw new Error('User playlist is empty');
    }
    
    // Get saved courses
    const savedCourses = await Course.aggregate([
        {
            $match: {
                _id: { $in: foundUserPlaylist.saved }
            }
        },
        {
            $project: {
                id: '$_id',
                title: 1,
                image: '$thumbnail',
                profileImg: '$tutorAvatar',
                tutorId: '$tutor',
            }
        }
    ]);

    // Check if savedCourses is empty
    if (savedCourses.length === 0) {
        res.status(404);
        throw new Error('No saved courses found');
    }

    res.status(200).json(savedCourses);
})

module.exports = {
    getCourses,
    getTotalCourses,
    getTopCourses,
    getOneCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    saveCourse,
    getSavedCourses,
}