const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// Importing models
const User = require('../models/user');
const Tutor = require('../models/tutor');
const Course = require('../models/courses');
const { default: mongoose } = require('mongoose');

// @desc   Get all tutors
// @route  GET /tutors
// @access Private
const getTutors = asyncHandler(async (req, res) => {
    const tutors = await Tutor.aggregate([
        {
            $lookup: {
                from: 'users', // The collection name for the User schema
                localField: '_id', // The _id in the Tutor schema
                foreignField: '_id', // The _id in the User schema
                as: 'userDetails', // The resulting array from the join
            },
        },
        {
            $unwind: '$userDetails', // Unwind the joined userDetails array
        },
        {
            $project: {
                id: '$_id', // id from the Tutor schema
                img: '$userDetails.avatar', // avatar from the User schema
                name: '$userDetails.name', // name from the User schema
                role: '$tag', // tag from the Tutor schema
                courses: { $size: '$courses' }, // Count of courses in the Tutor schema
                content: { $size: '$content' }, // Count of content in the Tutor schema
                likes: { $size: '$userDetails.likes' }, // Count of likes in the User schema
            },
        },
    ]);

    // Check if no tutors found
    if (tutors.length === 0) {
        res.status(404);
        throw new Error('No tutors found');
    }

    res.status(200).json(tutors);
});

// @desc   Get tutor names
// @route  GET /tutors/tutorNames
// @access Public
const getTutorNames = asyncHandler(async (req, res) => {
    const tutorList = await Tutor.find().exec();

    // Check if no tutors found
    if (tutorList.length === 0) {
        res.status(404);
        throw new Error('No tutors found');
    }

    const tutorNames = await User.find({ _id: { $in: tutorList.map(tutor => tutor._id) } }).select('name').exec();
    res.status(200).json(tutorNames);
})

// @desc   Get total tutors
// @route  GET /tutors/totalTutors
// @access Public
const getTotalTutors = asyncHandler(async (req, res) => {
    const totalTutors = await Tutor.find().countDocuments().exec();
    res.status(200).json({ totalTutors });
})

// @desc   Get one tutor
// @route  GET /tutors/oneTutor
// @access Public
const getOneTutor = asyncHandler(async (req, res) => {
    const { email } = req.params;

    // Check if email is empty
    if (!email) {
        res.status(400);
        throw new Error('Email is required');
    }
    const tutor = await Tutor.findOne({ email }).collation({ locale: 'en', strength: 2 }).exec();
    res.status(200).json(tutor);
})

// @desc   Create tutor
// @route  POST /tutors/create
// @access Private
const createTutor = asyncHandler(async (req, res) => {
    const { userId, roles, email } = req;

    // Check if user exists
    const userFound = await User.findById(userId).exec();
    if (!userFound) {
        res.status(404);
        throw new Error('User not found');
    }

    // Check if tutor exists
    const tutorFound = await Tutor.findById(userId).exec();
    if (roles.includes('tutor') || tutorFound) {
        res.status(409);
        throw new Error('Tutor already exists');
    }

    // Check if the user's email is verified
    if (!userFound.isEmailVerified) {
        res.status(417);
        throw new Error('Email not verified, first verify your email in your Profile!');
    }

    // Create new tutor in tutor's collection
    console.log("The tutor id is: ", userId, " and email = ", email);
    const newTutor = new Tutor({
        email: email,
        _id: userFound._id,
    });
    await newTutor.save();

    // Update user's roles
    userFound.roles.push('tutor');
    await userFound.save();

    // Generate new access token
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "userId": userFound._id,
                "email": userFound.email,
                "roles": userFound.roles,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30m' }
    )

    res.status(201).json({
        accessToken,
        roles: userFound.roles
    });
})

// @desc   Update tutor
// @route  PUT /tutors/update
// @access Private
const updateTutor = asyncHandler(async (req, res) => {
    const { email, name, tag, courses, videos, likes } = req.body;

    // Check if all fields are provided
    if (!email) {
        res.status(400);
        throw new Error('Email is required.');
    }

    // Check if courses, videos and likes are valid arrays
    if (courses && !Array.isArray(courses)) {
        res.status(400);
        throw new Error('Courses must be an array.');
    }

    if (videos && !Array.isArray(videos)) {
        res.status(400);
        throw new Error('Videos must be an array.');
    }

    if (likes && !Array.isArray(likes)) {
        res.status(400);
        throw new Error('Likes must be an array.');
    }

    // Check if tutor exists
    const updatedTutor = await Tutor.findOne({ email }).collation({ locale: 'en', strength: 2 }).exec();
    if (!updatedTutor) {
        res.status(404);
        throw new Error('Tutor not found.');
    }

    // Update tutor
    updatedTutor.name = name || updatedTutor.name;
    updatedTutor.tag = tag || updatedTutor.tag;
    updatedTutor.courses = courses || updatedTutor.courses;
    updatedTutor.videos = videos || updatedTutor.videos;
    updatedTutor.likes = likes || updatedTutor.likes;
    await updatedTutor.save();

    res.status(200).json(updatedTutor);
})

// @desc   Delete tutor
// @route  DELETE /tutors/delete
// @access Private
const deleteTutor = asyncHandler(async (req, res) => {
    const { email } = req.body;

    // Check if email is empty
    if (!email) {
        res.status(400);
        throw new Error('Email is required');
    }

    // Check if tutor exists
    const foundTutor = await Tutor.findOne({ email }).collation({ locale: 'en', strength: 2 }).exec();
    if (!foundTutor) {
        res.status(404);
        throw new Error('Tutor not found');
    }

    // Delete tutor
    await Tutor.deleteOne().where({ email: email }).collation({ locale: 'en', strength: 2 }).exec();
    res.status(204).json({ message: 'Tutor deleted' });
})

// @desc   Get tutor courses
// @route  GET /tutors/getCourses/:tutorId
// @access Private
const getTutorCourses = asyncHandler(async (req, res) => {
    const { tutorId } = req.params;

    // Check if tutorId is empty
    if (!tutorId) {
        res.status(400);
        throw new Error('Tutor Id is required');
    }

    // Check if tutor exists
    const tutor = await Tutor.findById(tutorId).exec();
    if (!tutor) {
        res.status(404);
        throw new Error('Tutor not found');
    }

    // Checking if tutor has courses
    if (tutor.courses.length === 0) {
        res.status(206);
        throw new Error('No courses found for this tutor');
    }

    // Fetching courses details
    const personalCourses = await Course.aggregate([
        {
            $match: { _id: { $in: tutor.courses.map(id => new mongoose.Types.ObjectId(id)) } }
        },
        {
            $project: {
                id: '$_id',
                title: 1,
                description: 1,
                image: '$thumbnail',
                category: 1,
                contentCount: { $size: '$content' },
                status: 1,
                createdAt: 1
            }
        }
    ]);

    res.status(200).json(personalCourses);
})

module.exports = {
    getTutors,
    getTutorNames,
    getTotalTutors,
    getOneTutor,
    createTutor,
    updateTutor,
    deleteTutor,
    getTutorCourses
}