const asyncHandler = require('express-async-handler');

// Importing models
const User = require('../models/user');

// @desc   Get all users
// @route  GET /users
// @access Private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().exec();
    res.status(200).json(users);
});

// @desc   Get one user
// @route  GET /users/oneUser
// @access Public
const getOneUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email }).exec();
    res.status(200).json(user);
})

// @desc   Update user
// @route  PUT /users/update
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { email, role } = req.body;
    const updatedUser = await User.findOne({ email }).exec();
    updatedUser.role = role;
    await updatedUser.save();
    res.status(200).json(updatedUser);
})

// @desc   Update user role
// @route  PUT /users/updateRole
// @access Private
const updateRole = asyncHandler(async (req, res) => {
    const { email, role } = req.body;
    const updatedUser = await User.findOne({ email }).exec();
    updatedUser.role = role;
    await updatedUser.save();
    res.status(200).json(updatedUser);
})

// @desc   Delete user
// @route  DELETE /users/delete
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    await User.findOneAndDelete({ email }).exec();
    res.status(204).json({ message: 'No content' });
})

module.exports = {
    getUsers,
    getOneUser,
    updateUser,
    updateRole,
    deleteUser
}