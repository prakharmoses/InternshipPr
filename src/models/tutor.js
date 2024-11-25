const mongoose = require('mongoose')

const tutorSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Id is required'],
            ref: 'User',
        },
        tag: {
            type: String,
            required: [true, 'Tag is required'],
            default: 'Tutor',
            maxlength: [20, 'Tag must be less than 20 characters'],
        },
        courses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            default: [],
        }],
        content: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Content',
            default: [],
        }],
    }, {
        _id: false,
    }
)

module.exports = mongoose.model('Tutor', tutorSchema)