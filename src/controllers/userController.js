const asyncHandler = require('express-async-handler');

// Importing models
const User = require('../models/user');

// @desc   Get all users
// @route  GET /users
// @access Private
const getUsers = asyncHandler(async (req, res) => {
    if (req.roles.indexOf('admin') === -1) {
        res.status(401);
        throw new Error('Unauthorized: Only admins can access.');
    }

    const users = await User.find().select('-password').lean();
    res.status(200).json(users);
});

// @desc   Get total students
// @route  GET /users/totalStudents
// @access Public
const getTotalStudents = asyncHandler(async (req, res) => {
    const totalStudents = await User.find({ roles: { $in: ['student'] } }).countDocuments().exec();
    res.status(200).json({ totalStudents });
})

// @desc   Get one user
// @route  GET /users/oneUser
// @access Public
const getOneUser = asyncHandler(async (req, res) => {
    const { email } = req.params;

    // Check if email is provided
    if (!email || email === '') {
        res.status(400);
        throw new Error('Email is required');
    }

    // Authorization
    if (req.email !== email) {
        res.status(401);
        throw new Error('Unauthorized');
    }

    // Check if user exists
    const user = await User.findOne({ email }).select('-password').collation({ locale: 'en', strength: 2 }).exec();
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json(user);
})

// @desc   Get profile insights
// @route  GET /users/getProfile-insights
// @access Private
const getProfileInsights = asyncHandler(async (req, res) => {
    const { email } = req.params;

    // Check if email is provided
    if (!email || email === '') {
        res.status(400);
        throw new Error('Email is required');
    }

    // Check for the authorization
    if (req.email !== email) {
        res.status(403);
        throw new Error('Forbidden, authorization error.');
    }

    // Check if user exists
    const user = await User.findOne({ email }).select('likes comments saved').collation({ locale: 'en', strength: 2 }).exec();
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json({
        likes: user.likes.length,
        comments: user.comments.length,
        saved: user.saved.length
    });
})

// @desc   Get email verification status
// @route  GET /users/get-email-verification-status
// @access Public
const getEmailVerificationStatus = asyncHandler(async (req, res) => {
    const { email } = req.params;

    // Check if email is provided
    if (!email || email === '') {
        res.status(400);
        throw new Error('Email is required');
    }

    // Check if user exists
    const user = await User.findOne({ email }).select('isEmailVerified').exec();
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json({ isEmailVerified: user.isEmailVerified });
})

// @desc   Update user
// @route  PUT /users/update
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { email, likes, comments, saved, premium } = req.body;

    // Check if email is provided
    if (!email) {
        res.status(400);
        throw new Error('Email is required');
    }

    // Check for the authorization
    if (!req.roles.includes('admin') && req.email !== email) {
        res.status(403);
        throw new Error('Forbidden, authorization error.');
    }

    // Check if saved, likes and comments are valid
    if (saved && !Array.isArray(saved) || likes && !Array.isArray(likes) || comments && !Array.isArray(comments)) {
        res.status(400);
        throw new Error('Invalid saved or likes or comments!');
    }

    // Check if user exists
    const updatedUser = await User.findOne({ email }).collation({ locale: 'en', strength: 2 }).exec();
    if (!updatedUser) {
        res.status(401);
        throw new Error('User not found');
    }

    // Update the user
    updatedUser.likes = likes || updatedUser.likes;
    updatedUser.comments = comments || updatedUser.comments;
    updatedUser.saved = saved || updatedUser.saved;
    updatedUser.premium = premium || updatedUser.premium;

    await updatedUser.save();
    res.status(200).json({
        likes: updatedUser.likes,
        comments: updatedUser.comments,
        saved: updatedUser.saved,
        roles: updatedUser.roles,
        premium: updatedUser.premium
    });
})

// @desc   Update user profile
// @route  PATCH /users/update-profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const { email, name, avatar, cover, about, dob, phoneNo } = req.body;

    // Check if email is provided
    if (!email) {
        res.status(400);
        throw new Error('Email is required');
    }

    // Check if DoB is provided in correct format
    if (dob && isNaN(Date.parse(dob))) {
        res.status(400);
        throw new Error('Invalid date of birth');
    }

    // Check for the authorization
    if (!req.roles.includes('admin') && req.email !== email) {
        res.status(403);
        throw new Error('Forbidden, authorization error.');
    }

    // Check if user exists
    const updatedUser = await User.findOne({ email }).collation({ locale: 'en', strength: 2 }).exec();
    if (!updatedUser) {
        res.status(401);
        throw new Error('User not found');
    }

    // Update the user
    updatedUser.name = name || updatedUser.name;
    updatedUser.avatar = avatar || updatedUser.avatar;
    updatedUser.cover = cover || updatedUser.cover;
    updatedUser.about = about || updatedUser.about;
    updatedUser.dob = new Date(dob) || updatedUser.dob;
    updatedUser.phoneNo = phoneNo || updatedUser.phoneNo;

    await updatedUser.save();
    res.status(200).json({ message: 'Profile updated successfully' });
})

// @desc   Delete user
// @route  DELETE /users/delete
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
        res.status(400);
        throw new Error('Email is required');
    }

    // Check for the authorization
    if (!req.roles.includes('admin')) {
        res.status(403);
        throw new Error('Forbidden, authorization error.');
    }

    await User.findOneAndDelete({ email }).exec();
    res.status(204).json({ message: 'No content' });
})

module.exports = {
    getUsers,
    getTotalStudents,
    getOneUser,
    getProfileInsights,
    getEmailVerificationStatus,
    updateUser,
    updateUserProfile,
    deleteUser
}