const asyncHandler = require('express-async-handler');

// Importing models
const Content = require('../models/content');
const Course = require('../models/courses');
const User = require('../models/user');

// @desc   Get all contents
// @route  GET /contents
// @access Public
const getContents = asyncHandler(async (req, res) => {
    const contents = await Content.find().exec();
    res.status(200).json(contents);
});

// @desc   Get one content
// @route  GET /contents/oneContent
// @access Public
const getOneContent = asyncHandler(async (req, res) => {
    const { title } = req.body;
    const content = await Content.findOne({ title }).exec();
    res.status(200).json(content);
})

// @desc   Create content
// @route  POST /contents/create
// @access Private
const createContent = asyncHandler(async (req, res) => {
    const { title, description, course, tutor } = req.body;
    const newContent = new Content({
        title,
        description,
        course,
        tutor,
    });
    await newContent.save();
    res.status(201).json(newContent);
})

// @desc   Update content
// @route  PUT /contents/update
// @access Private
const updateContent = asyncHandler(async (req, res) => {
    const { title, description, course, tutor } = req.body;
    const updatedContent = await Content.findOne({ title }).exec();
    updatedContent.description = description;
    updatedContent.course = course;
    updatedContent.tutor = tutor;
    await updatedContent.save();
    res.status(200).json(updatedContent);
})

// @desc   Delete content
// @route  DELETE /contents/delete
// @access Private
const deleteContent = asyncHandler(async (req, res) => {
    const { title } = req.body;
    await Content.findOneAndDelete({ title }).exec();
    res.status(204).json({ message: 'No content' });
})

module.exports = {
    getContents,
    getOneContent,
    createContent,
    updateContent,
    deleteContent
}