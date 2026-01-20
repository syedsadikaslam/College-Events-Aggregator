const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth'); // Ensure file is 'auth.js'
const multer = require('multer');

// Configure Multer for memory storage (Base64)
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    }
});

/**
 * @route   GET /api/users/me
 * @desc    Get current user profile (Zaruri for Login flow)
 * @access  Private
 */
router.get('/me', protect, async (req, res) => {
    try {
        // req.user.id protect middleware se aata hai
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            data: user // Frontend isi 'data' ko AuthContext mein read karega
        });
    } catch (err) {
        console.error('Get User Error:', err.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

/**
 * @route   PUT /api/users/profile-image
 * @desc    Update user profile image
 * @access  Private
 */
router.put('/profile-image', protect, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload an image' });
        }

        // Convert buffer to base64
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

        // Update user in Database
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { profileImage: dataURI },
            { new: true, runValidators: true }
        ).select('-password');

        res.json({
            success: true,
            data: user,
            message: 'Profile image updated successfully'
        });
    } catch (err) {
        console.error('Profile image upload error:', err);
        res.status(500).json({ success: false, message: 'Server Error: ' + err.message });
    }
});

module.exports = router;