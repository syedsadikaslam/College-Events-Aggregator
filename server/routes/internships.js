const express = require('express');
const router = express.Router();
const Internship = require('../models/Internship');
const { protect, authorize } = require('../middleware/auth');

// Get all internships
router.get('/', async (req, res) => {
    try {
        const internships = await Internship.find();
        res.json(internships);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create an internship (Admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
    const internship = new Internship({
        role: req.body.role,
        company: req.body.company,
        stipend: req.body.stipend,
        location: req.body.location,
        applyLink: req.body.applyLink,
    });

    try {
        const newInternship = await internship.save();
        res.status(201).json(newInternship);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a single internship
router.get('/:id', async (req, res) => {
    try {
        const internship = await Internship.findById(req.params.id);
        if (!internship) return res.status(404).json({ message: 'Internship not found' });
        res.json(internship);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update an internship (Admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const internship = await Internship.findById(req.params.id);
        if (!internship) return res.status(404).json({ message: 'Internship not found' });

        Object.assign(internship, req.body);
        const updatedInternship = await internship.save();
        res.json(updatedInternship);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an internship (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const internship = await Internship.findById(req.params.id);
        if (!internship) return res.status(404).json({ message: 'Internship not found' });

        await internship.deleteOne();
        res.json({ message: 'Internship deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
