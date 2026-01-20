const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { protect, authorize } = require('../middleware/auth');

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create an event (Admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
    const event = new Event({
        title: req.body.title,
        college: req.body.college,
        date: req.body.date,
        description: req.body.description,
        registrationLink: req.body.registrationLink,
    });

    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a single event
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update an event (Admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        Object.assign(event, req.body);
        const updatedEvent = await event.save();
        res.json(updatedEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an event (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        await event.deleteOne();
        res.json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
