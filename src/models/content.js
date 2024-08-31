const mongoose = require('mongoose');

const commentScema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        userAvatar: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        reply: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            userName: {
                type: String,
                required: true
            },
            userAvatar: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }]
    }, {
        timestamps: true
    }
)

const contentSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
            required: true,
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
        },
        contentImg: {
            type: String,
            required: [true, 'Content image is required'],
        },
        contentType: {
            type: String,
            enum: ['text', 'video'],
            required: [true, 'Content type is required'],
        },
        content: {
            type: String,
        },
        video: {
            type: String,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        comments: [commentScema]
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Content', contentSchema)