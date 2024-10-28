const asyncHandler = require('express-async-handler');

// Importing models
const User = require('../models/user');
const Tutor = require('../models/tutor');

// @desc   Get all tutors
// @route  GET /tutors
// @access Private
const getTutors = asyncHandler(async (req, res) => {
    const tutors = await Tutor.find().exec();

    // Check if tutors is empty
    if (tutors.length === 0) {
        res.status(404);
        throw new Error('No tutors found');
    }
    res.status(200).json(tutors);
});

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
    const { email, name, id, tag } = req.body;

    // Check if all fields are provided
    if (!email || !name || !id || !tag) {
        res.status(400);
        throw new Error('All fields are required');
    }

    // Check if tutor already exists
    const foundTutor = await Tutor.findOne({ email }).collation({ locale: 'en', strength: 2 }).exec();
    if (foundTutor) {
        res.status(400);
        throw new Error('Tutor already exists');
    }

    // Create new tutor
    const newTutor = new Tutor({
        email,
        name,
        id,
        tag
    });
    await newTutor.save();

    res.status(201).json(newTutor);
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

module.exports = {
    getTutors,
    getTotalTutors,
    getOneTutor,
    createTutor,
    updateTutor,
    deleteTutor
}