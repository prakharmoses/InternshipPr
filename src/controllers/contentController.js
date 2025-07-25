const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

// Importing models
const Content = require('../models/content');
const Course = require('../models/courses');
const User = require('../models/user');
const Tutor = require('../models/tutor');

// Import config
const transporter = require('../config/nodemailer');

// @desc   Get one content
// @route  GET /content/getContent/:contentId
// @access Public
const getContent = asyncHandler(async (req, res) => {
    const { contentId } = req.params;

    // Check if contentId is empty
    if (!contentId) {
        res.status(400);
        throw new Error('Content ID is required');
    }

    // Fetching the content
    const content = await Content.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(contentId) }
        },
        {
            $addFields: { likes: { $size: '$likedBy' } }
        },
        {
            $project: {
                title: 1,
                contentImg: 1,
                contentType: 1,
                content: 1,
                description: 1,
                likes: 1,
                comments: 1,
                createdAt: 1,
                course: 1,
                tutor: 1,
                _id: 0
            }
        }
    ])

    // Check if the content exists
    if (!content || !content.length) {
        res.status(404);
        throw new Error('Content not found');
    }

    res.status(200).json(content[0]);
});

// @desc   Get other content of course
// @route  GET /contents/getOtherContentOfCourse/:courseId
// @access Private
const getOtherContentOfCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;

    // Check if courseId is empty
    if (!courseId) {
        res.status(400);
        throw new Error('Course ID is required');
    }

    // Check if the course exists
    const courseContent = await Course.findById(courseId).select('content').exec();
    if (!courseContent) {
        res.status(404);
        throw new Error('Course not found');
    }

    // Get the contents
    const contents = await Content.aggregate([
        { $match: { _id: { $in: courseContent.content } } },
        { $addFields: { likes: { $size: '$likedBy' } } },
        {
            $project: {
                id: '$_id',
                title: 1,
                contentImg: 1,
                likes: 1,
                createdAt: 1,
                _id: 0
            }
        }
    ]);

    // Check if there are contents
    if (!contents.length) {
        res.status(404);
        throw new Error('No content found');
    }

    res.status(200).json(contents);
})

// @desc   Get content by course
// @route  GET /contents/getContentByCourse/:courseId
// @access Private
const getContentByCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;

    // Check if courseId is empty
    if (!courseId) {
        res.status(400);
        throw new Error('Course ID is required');
    }

    // Check if the course exists
    const courseContent = await Course.findById(courseId).select('content').exec();
    if (!courseContent) {
        res.status(404);
        throw new Error('Course not found');
    }

    // Get the contents
    const contents = await Content.aggregate([
        { $match: { _id: { $in: courseContent.content } } },
        { $project: { id: '$_id', title: 1, contentImg: 1, _id: 0 } }
    ]);

    // Check if there are contents
    if (!contents.length) {
        res.status(404);
        throw new Error('No content found');
    }

    res.status(200).json(contents);
})

// @desc   Toggle like content
// @route  PATCH /contents/toggleLikeContent
// @access Private
const toggleLikeContent = asyncHandler(async (req, res) => {
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

    // Check if the user exists
    const user = await User.findById(req.userId).exec();
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Check if the user has already liked the content
    const index = content.likedBy.findIndex(item => item.toString() === req.userId.toString());
    if (index === -1) {
        content.likedBy.push(req.userId);      // Add the user to the likedBy array
        user.likes.push(contentId);            // Add the content to the user's likedContent array
    } else {
        content.likedBy.splice(index, 1);      // Remove the user from the likedBy array
        user.likes.splice(user.likes.indexOf(contentId), 1);  // Remove the content from the user's liked
    }
    await content.save();
    await user.save();

    res.status(200).json({ likes: content.likedBy.length });
})

// @desc   Is content liked
// @route  GET /contents/isLiked/:contentId
// @access Private
const isContentLiked = asyncHandler(async (req, res) => {
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

    // Check if the user has already liked the content
    const index = content.likedBy.findIndex(item => item.toString() === req.userId.toString());

    res.status(200).json(index !== -1 ? true : false);
})

// @desc   Create content
// @route  POST /contents/create
// @access Private
const createContent = asyncHandler(async (req, res) => {
    const { title, contentImg, contentType, content, description, course, tutor } = req.body;

    // Check if the necessary fields are given
    if (!title || !contentImg || !contentType || !description || !course || !tutor || !content) {
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
        throw new Error('You are not authorized to create content.');
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
        content,
        description,
        course,
        tutor
    })
    await newContent.save();

    // Add the content to the course
    foundCourse.content.push(newContent._id);
    foundCourse.status = 'ongoing';
    await foundCourse.save();

    res.status(201).json(newContent._id);
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
    const updatedContent = await Content.findById(contentId).exec();
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
    updatedContent.title = title ? title : updatedContent.title;
    updatedContent.contentImg = contentImg ? contentImg : updatedContent.contentImg;
    updatedContent.contentType = contentType ? contentType : updatedContent.contentType;
    updatedContent.content = content ? content : updatedContent.content;
    updatedContent.video = video ? video : updatedContent.video;
    updatedContent.description = description ? description : updatedContent.description;
    updatedContent.course = course ? course : updatedContent.course;
    await updatedContent.save();

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
    const { contentId, comment } = req.body;

    // Check if all the fields are given
    if (!contentId || !comment) {
        res.status(400);
        throw new Error('Content ID and comment are required');
    }

    // Check if the content exists
    const foundContent = await Content.findById(contentId).exec();
    if (!foundContent) {
        res.status(404);
        throw new Error('Content not found');
    }

    // Check if the user exists
    const user = await User.findById(req.userId).exec();
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Add comment to the content
    const newComment = {
        _id: new mongoose.Types.ObjectId(),
        userId: req.userId,
        userName: user.name,
        userAvatar: user.avatar,
        comment: comment,
        reply: []
    }
    foundContent.comments.push(newComment);
    await foundContent.save();

    // Add comment content entry into user's comments array
    user.comments.push(foundContent._id);
    await user.save();

    // Notify the tutor about the comment via email and send the response
    const tutor = await User.findById(foundContent.tutor).exec();
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: tutor.email,
        subject: `New Comment from ${user.name} on ${foundContent.title}`,
        text: `Hello ${tutor.name},\n\nYou have a new comment on your content by ${user.name}.\n\nComment: ${comment}\n\nRegards,\nAngirasoft`
    }

    await transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return res.status(500).json({ message: 'Error sending email', error: err });
        }
        return res.status(201).json({ comments: foundContent.comments });
    })
})

// @desc   Add comment reply
// @route  PATCH /contents/addCommentReply
// @access Private
const addCommentReply = asyncHandler(async (req, res) => {
    const { contentId, commentId, comment } = req.body;

    // Check if all the fields are given
    if (!contentId || !commentId || !comment) {
        res.status(400);
        throw new Error('Content ID, comment ID, user ID and comment are required');
    }

    // Check if the content exists
    const foundContent = await Content.findById(contentId).exec();
    if (!foundContent) {
        res.status(404);
        throw new Error('Content not found');
    }

    // Check if the comment exists
    const foundComment = foundContent.comments.find(item => item._id.toString() === commentId.toString());
    if (!foundComment) {
        res.status(404);
        throw new Error('Comment not found');
    }

    // Check if the user exists
    const user = await User.findById(req.userId).exec();
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Add comment reply
    const newReply = {
        userId: req.userId,
        userName: user.name,
        userAvatar: user.avatar,
        comment,
    }
    foundComment.reply.push(newReply);
    await foundContent.save();

    // Add comment reply content entry into user's comments array
    user.comments.push(foundContent._id);
    await user.save();

    // Notify the person to commented on the reply via email and send the response
    const firstCommenter = await User.findById(foundComment.userId).exec();
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: firstCommenter.email,
        subject: `Reply from ${user.name} on ${foundContent.title}`,
        text: `Hello ${firstCommenter.name},\n\nYou have a new reply on your comment by ${user.name} on ${foundContent.title}.\n\nReply: ${comment}\n\nRegards,\nAngirasoft`
    }

    await transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return res.status(500).json({ message: 'Error sending email', error: err });
        }
        return res.status(201).json({ comments: foundContent.comments });
    })
})

// @desc   Get liked content
// @route  GET /contents/getLikedContent/:userId
// @access Private
const getLikedContent = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // Check if userId is empty
    if (!userId) {
        res.status(400);
        throw new Error('User ID is required');
    }

    // Check if the user exists
    const user = await User.findById(userId).exec();
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Get the liked content
    // Get the liked content
    const likedContent = await Content.aggregate([
        {
            $match: { _id: { $in: user.likes } } // Filter documents in `Content` collection
        },
        {
            $lookup: {
                from: 'users', // The name of the User collection in the database
                localField: 'tutor', // Field in `Content` collection to match
                foreignField: '_id', // Field in `User` collection to match
                as: 'tutorDetails' // Name for the resulting array
            }
        },
        {
            $unwind: '$tutorDetails' // Unwind the array to access individual user details
        },
        {
            $project: {
                id: '$_id', // Rename `_id` to `id`
                title: 1, // Include the `title` field
                image: '$contentImg', // Include and rename `contentImg` to `image`
                profileId: '$tutor', // Include the `tutor` field as `profileId`
                profileImg: '$tutorDetails.avatar', // Include the `avatar` field from `User`
                _id: 0 // Exclude the `_id` field
            }
        }
    ]);


    // Check if there are liked content
    if (!likedContent.length) {
        res.status(404);
        throw new Error('No liked content found');
    }

    res.status(200).json(likedContent);
})

// @desc   Get commented content
// @route  GET /contents/getCommentedContent/:userId
// @access Private
const getCommentedContent = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // Check if userId is empty
    if (!userId) {
        res.status(400);
        throw new Error('User ID is required');
    }

    // Check if the user exists
    const user = await User.findById(userId).exec();
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Get the commented content
    const commentedContent = await Content.aggregate([
        { $match: { _id: { $in: user.comments } } },
        {
            $lookup: {
                from: 'users',
                localField: 'tutor',
                foreignField: '_id',
                as: 'tutorDetails'
            }
        },
        { $unwind: '$tutorDetails' },
        {
            $project: {
                id: '$_id',
                title: 1,
                image: '$contentImg',
                profileId: '$tutor',
                profileImg: '$tutorDetails.avatar',
                _id: 0
            }
        }
    ]);

    // Check if there are commented content
    if (!commentedContent.length) {
        res.status(404);
        throw new Error('No commented content found');
    }

    res.status(200).json(commentedContent);
})

module.exports = {
    getContent,
    getOtherContentOfCourse,
    getContentByCourse,
    toggleLikeContent,
    isContentLiked,
    createContent,
    updateContent,
    deleteContent,
    addComment,
    addCommentReply,
    getLikedContent,
    getCommentedContent
}