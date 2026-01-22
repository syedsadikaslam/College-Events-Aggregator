const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    stipend: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    applyLink: {
        type: String,
        required: true,
    },
     description: {
        type: String,
        required: true,
    },
     lastDate: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Internship', InternshipSchema);