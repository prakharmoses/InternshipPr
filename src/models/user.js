const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
            required: true,
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        sex: {
            type: String,
            enum: ['M', 'F', 'O'],
        },
        avatar: {
            type: String,
        },
        cover: {
            type: String,
        },
        about: {
            type: String,
            default: 'Hey there! I am an Angirasoft member.',
        },
        likes: {
            type: [String],
            default: [],
        },
        comments: {
            type: [String],
            default: [],
        },
        saved: {
            type: [String],
            default: [],
        },
        role: {
            type: String,
            enum: ['student', 'tutor', 'admin'],
            default: 'student',
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        jwtToken: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        premium: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema);
