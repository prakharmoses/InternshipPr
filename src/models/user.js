const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
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
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Content',
            default: [],
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Content',
            default: [],
        }],
        saved: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            default: [],
        }],
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
    }, {
        _id: false,
    }
)

module.exports = mongoose.model('User', userSchema);
