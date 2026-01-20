const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    internshipId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Internship'
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Application', applicationSchema);
