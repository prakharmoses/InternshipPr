const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

// Importing models
const Content = require('../models/content');
const Course = require('../models/courses');
const User = require('../models/user');

// @desc   Get one content
// @route  GET /contents/oneContent
// @access Public
const getContent = asyncHandler(async (req, res) => {
    const { contentId } = req.params;

    // Check if contentId is empty
    if (!contentId) {
        res.status(400);
        throw new Error('Content ID is required');
    }

    // Check if the content exists
    const content = await Content.findById(contentId).exec();
    if (!content) {
        res.status(404);
        throw new Error('Content not found');
    }

    res.status(200).json(content);
});

// @desc   Create content
// @route  POST /contents/create
// @access Private
const createContent = asyncHandler(async (req, res) => {
    const { title, contentImg, contentType, content, video, description, course, tutor } = req.body;

    // Check if the necessary fields are given
    if (!title || !contentImg || !contentType || !description || !course || !tutor) {
        res.status(400);
        throw new Error('Title, content image, content type, description, course and tutor are required');
    }

    // Check if the course and tutor are valid
    if (!mongoose.Types.ObjectId.isValid(course) || !mongoose.Types.ObjectId.isValid(tutor)) {
        res.status(400);
        throw new Error('Course and tutor should be mongoose object id');
    }

    // Check if the course and tutor exist
    const foundCourse = await Course.findById(course).exec();
    const foundTutor = await User.findById(tutor).exec();
    if (!foundCourse || !foundTutor) {
        res.status(404);
        throw new Error('Course or tutor not found');
    }

    // Check if the user is authorized to create content
    if (foundCourse.tutor.toString() !== req.userId.toString() && !req.roles.includes('admin')) {
        res.status(403);
        throw new Error('You are not authorized to create content');
    }

    // Check if the content already exists
    const foundContent = await Content.findOne({ title }).exec();
    if (foundContent && foundContent.course === course) {
        res.status(400);
        throw new Error('Content already exists');
    }

    // Create new content
    const newContent = new Content({
        title,
        contentImg,
        contentType,
        content: content ? content : null,
        video: video ? video : null,
        description,
        course,
        tutor
    })
    await newContent.save();

    res.status(201).json(newContent);
})

// @desc   Update content
// @route  PATCH /contents/update
// @access Private
const updateContent = asyncHandler(async (req, res) => {
    const { contentId, title, contentImg, contentType, content, video, description, course } = req.body;

    // Check if contentId is empty
    if (!contentId) {
        res.status(400);
        throw new Error('Content ID is required');
    }

    // Check if the content exists
    const updatedContent = await Content.findById(content).exec();
    if (!updatedContent) {
        res.status(404);
        throw new Error('Content not found');
    }

    // Check the course exists if given
    if (course && (!mongoose.Types.ObjectId.isValid(course) || !Course.findById(course).exec())) {
        res.status(400);
        throw new Error('Course should be mongoose object id and should exist.');
    }

    // Check if the user is authorized to update the content
    if (updatedContent.tutor.toString() !== req.userId.toString() && !req.roles.includes('admin')) {
        res.status(403);
        throw new Error('You are not authorized to update this content');
    }

    // Update the content
    updatedContent.title = title ? title : updateContent.title;
    updatedContent.contentImg = contentImg ? contentImg : updateContent.contentImg;
    updatedContent.contentType = contentType ? contentType : updateContent.contentType;
    updatedContent.content = content ? content : updateContent.content;
    updatedContent.video = video ? video : updateContent.video;
    updatedContent.description = description ? description : updateContent.description;
    updatedContent.course = course ? course : updateContent.course;
    await updateContent.save();
    
    res.status(200).json(updatedContent);
})

// @desc   Delete content
// @route  DELETE /contents/delete
// @access Private
const deleteContent = asyncHandler(async (req, res) => {
    const { contentId } = req.body;

    // Check if contentId is empty
    if (!contentId) {
        res.status(400);
        throw new Error('Content ID is required');
    }

    // Check if the content exists
    const content = await Content.findById(content).exec();
    if (!content) {
        res.status(404);
        throw new Error('Content not found');
    }

    // Check if the user is authorized to delete the content
    if (content.tutor.toString() !== req.userId.toString() && !req.roles.includes('admin')) {
        res.status(403);
        throw new Error('You are not authorized to delete this content');
    }

    // Delete the content
    await content.deleteOne();
    res.status(204).json({ message: 'No content' });
})

// @desc   Add comment
// @route  PATCH /contents/addComment
// @access Private
const addComment = asyncHandler(async (req, res) => {
    const { contentId, userName, userAvatar, comment } = req.body;

    // Check if all the fields are given
    if (!contentId || !userName || !userAvatar || !comment) {
        res.status(400);
        throw new Error('Content ID, user ID, user name, user avatar and comment are required');
    }

    // Check if the content exists
    const foundContent = await Content.findById(contentId).exec();
    if (!foundContent) {
        res.status(404);
        throw new Error('Content not found');
    }

    // Add comment
    const newComment = {
        _id: mongoose.Types.ObjectId(),
        userId: req.userId,
        userName: userName,
        userAvatar: userAvatar,
        comment: comment,
    }
    foundContent.comment.push(newComment);
    await foundContent.save();

    res.status(200).json({ content: foundContent, commentId: newComment._id });
})

// @desc   Add comment reply
// @route  PATCH /contents/addCommentReply
// @access Private
const addCommentReply = asyncHandler(async (req, res) => {
    const { contentId, commentId, userId, userName, userAvatar, comment } = req.body;

    // Check if all the fields are given
    if (!contentId || !commentId || !userId || !userName || !userAvatar || !comment) {
        res.status(400);
        throw new Error('Content ID, comment ID, user ID, user name, user avatar and comment are required');
    }

    // Check if the content exists
    const foundContent = await Content.findById(content).exec();
    if (!foundContent) {
        res.status(404);
        throw new Error('Content not found');
    }

    // Check if the comment exists
    const foundComment = foundContent.comment.find(item => item._id === commentId);
    if (!foundComment) {
        res.status(404);
        throw new Error('Comment not found');
    }

    // Add comment reply
    const newReply = {
        userId,
        userName,
        userAvatar,
        comment,
    }
    foundComment.reply.push(newReply);
    await foundContent.save();

    res.status(200).json({ content: foundContent, commentId: foundComment._id });
})

module.exports = {
    getContent,
    createContent,
    updateContent,
    deleteContent,
    addComment,
    addCommentReply
}