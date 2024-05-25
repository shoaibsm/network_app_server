const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        url: String
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CablesmithProject'
        }
    ]
}, { timestamps: true }
)

module.exports = mongoose.model('CablesmithUser', userSchema)