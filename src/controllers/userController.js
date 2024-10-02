const asyncHandler = require('express-async-handler');

// Import config
const transporter = require('../config/nodemailer');
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

// @desc   Update user
// @route  PUT /users/update
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { email, name, avatar, cover, about, likes, comments, saved, premium } = req.body;

    // Check if email is provided
    if (!email) {
        res.status(400);
        throw new Error('Email is required');
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
    updatedUser.name = name || updatedUser.name;
    updatedUser.avatar = avatar || updatedUser.avatar;
    updatedUser.cover = cover || updatedUser.cover;
    updatedUser.about = about || updatedUser.about;
    updatedUser.likes = likes || updatedUser.likes;
    updatedUser.comments = comments || updatedUser.comments;
    updatedUser.saved = saved || updatedUser.saved;
    updatedUser.premium = premium || updatedUser.premium;

    await updatedUser.save();
    res.status(200).json({
        name: updatedUser.name,
        avatar: updatedUser.avatar,
        cover: updatedUser.cover,
        about: updatedUser.about,
        likes: updatedUser.likes,
        comments: updatedUser.comments,
        saved: updatedUser.saved,
        roles: updatedUser.roles,
        premium: updatedUser.premium
    });
})

// @desc   Reset password
// @route  PATCH /users/resetPassword
// @access Private
const resetPassword = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        res.status(400);
        throw new Error('Email and password are required');
    }

    // Check authorization
    if (req.email !== email) {
        res.status(403);
        throw new Error('Forbidden, authorization error.');
    }

    // Check if password satisfies the constraints
    const PASS_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (!PASS_REGEX.test(password)) {
        res.status(400);
        throw new Error('Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character');
    }

    // Check if user exists
    const foundUser = await User.findOne({ email }).collation({ locale: 'en', strength: 2 }).exec();
    if (!foundUser) {
        res.status(401);
        throw new Error('Invalid email or password');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the password
    foundUser.password = hashedPassword;
    await foundUser.save();

    res.status(200).json({ message: 'Password updated successfully' });
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
    getOneUser,
    updateUser,
    resetPassword,
    deleteUser
}