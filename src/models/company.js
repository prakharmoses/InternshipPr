const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, 'Name is required'],
        },
        userAvatar: {
            type: String,
            required: [true, 'Avatar is required'],
        },
        rating: {
            type: Number,
            required: [true, 'Rating is required'],
        },
        comment: {
            type: String,
            required: [true, 'Comment is required'],
        },
    }, {
        _id: false,
    }
)

const companySchema = new mongoose.Schema(
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
        address: {
            type: String,
            required: [true, 'Address is required'],
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
        },
        website: {
            type: String,
            required: [true, 'Website is required'],
        },
        logo: {
            type: String,
            required: [true, 'Logo is required'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        feedback: [feedbackSchema],
    }, {
        _id: false,
    }
)

module.exports = mongoose.model('Company', companySchema)