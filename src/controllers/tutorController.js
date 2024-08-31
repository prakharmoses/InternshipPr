const asyncHandler = require('express-async-handler');

// Importing models
const User = require('../models/user');
const Tutor = require('../models/tutor');

// @desc   Get all tutors
// @route  GET /tutors
// @access Private
const getTutors = asyncHandler(async (req, res) => {
    const tutors = await Tutor.find().exec();
    res.status(200).json(tutors);
});

// @desc   Get one tutor
// @route  GET /tutors/oneTutor
// @access Public
const getOneTutor = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const tutor = await Tutor.findOne({ email }).exec();
    res.status(200).json(tutor);
})

// @desc   Create tutor
// @route  POST /tutors/create
// @access Private
const createTutor = asyncHandler(async (req, res) => {
    const { email, firstName } = req.body;
    const newTutor = new Tutor({
        email,
        firstName,
    });
    await newTutor.save();
    res.status(201).json(newTutor);
})

// @desc   Update tutor
// @route  PUT /tutors/update
// @access Private
const updateTutor = asyncHandler(async (req, res) => {
    const { email, firstName } = req.body;
    const updatedTutor = await Tutor.findOne({ email }).exec();
    updatedTutor.firstName = firstName;
    await updatedTutor.save();
    res.status(200).json(updatedTutor);
})

// @desc   Delete tutor
// @route  DELETE /tutors/delete
// @access Private
const deleteTutor = asyncHandler(async (req, res) => {
    const { email } = req.body;
    await Tutor
        .findOneAndDelete({ email })
        .exec();
    res.status(204).json({ message: 'No content' });
})

module.exports = {
    getTutors,
    getOneTutor,
    createTutor,
    updateTutor,
    deleteTutor
}