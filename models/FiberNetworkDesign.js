const mongoose = require('mongoose')

const FiberNetworkDesignSchema = mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    polylineData: [
        {
            lat: Number,
            lng: Number
        }
    ],
    fiberLength: {
        type: Number,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('FiberNetworkDesign', FiberNetworkDesignSchema)