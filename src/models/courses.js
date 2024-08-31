const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema(
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
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        category: {
            type: String,
            enum: ['Development', 'Business', 'Finance', 'IT & Software', 'Office Productivity', 'Personal Development', 'Design', 'Marketing', 'Lifestyle', 'Photography', 'Health & Fitness', 'Music'],
            required: [true, 'Category is required'],
        },
        status: {
            type: String,
            enum: ['ongoing', 'ended', 'upcoming'],
            default: 'ongoing',
        },
        tutor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Tutor is required'],
        },
        tutorName: {
            type: String,
            required: [true, 'Tutor name is required'],
        },
        tutorAvatar: {
            type: String,
            required: [true, 'Tutor avatar is required'],
        },
        thumbnail: {
            type: String,
            required: [true, 'Thumbnail is required'],
        },
        content: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Content',
            required: [true, 'Content is required'],
        }]
    },
    {
        timestamps: true,
    })

module.exports = mongoose.model('Course', courseSchema)