const mongoose = require('mongoose')

const tutorSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Id is required'],
            ref: 'User',
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        tag: {
            type: String,
            required: [true, 'Tag is required'],
        },
        courses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            default: [],
        }],
        videos: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video',
            default: [],
        }],
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Content',
            default: [],
        }],
    }, {
        _id: false,
    }
)

module.exports = mongoose.model('Tutor', tutorSchema)