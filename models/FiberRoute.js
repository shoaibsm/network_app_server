const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FiberRouteSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    paths: {
        type: [[{ lat: Number, lng: Number }]],
        required: true
    },
    totalDistance: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('FiberRoute', FiberRouteSchema);