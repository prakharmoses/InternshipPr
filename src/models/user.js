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
            default: 'O',
        },
        avatar: {
            type: String,
            default: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080',
        },
        cover: {
            type: String,
            default: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxob21lfGVufDB8MHx8fDE3MTA0MDE1NDZ8MA&ixlib=rb-4.0.3&q=80&w=1080',
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
            required: false,
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
