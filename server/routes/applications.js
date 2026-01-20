const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const { protect, authorize } = require('../middleware/auth');

// @route   POST /api/applications
// @desc    Apply for an internship
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { internshipId, eventId } = req.body;

        if (!internshipId && !eventId) {
            return res.status(400).json({ success: false, message: 'Internship ID or Event ID is required' });
        }

        // Check if already applied
        const query = { userId: req.user.id };
        if (internshipId) query.internshipId = internshipId;
        if (eventId) query.eventId = eventId;

        const existingApplication = await Application.findOne(query);

        if (existingApplication) {
            return res.status(400).json({ success: false, message: 'You have already applied for this position/event' });
        }

        const application = await Application.create({
            userId: req.user.id,
            internshipId,
            eventId
        });

        res.status(201).json({ success: true, data: application });
    } catch (err) {
        console.error('Apply error:', err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @route   GET /api/applications/my-applications
// @desc    Get current logged in user applications
// @access  Private
router.get('/my-applications', protect, async (req, res) => {
    console.log(`[DEBUG] GET /my-applications requested by user: ${req.user.id}`);
    try {
        const applications = await Application.find({ userId: req.user.id })
            .populate('internshipId')
            .populate('eventId')
            .sort({ appliedAt: -1 }); // Newest first

        console.log(`[DEBUG] Found ${applications.length} applications`);
        res.json({ success: true, data: applications });
    } catch (err) {
        console.error('[ERROR] Fetch applications error:', err);
        res.status(500).json({ success: false, message: 'Server Error: ' + err.message });
    }
});

module.exports = router;
