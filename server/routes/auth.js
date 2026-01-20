const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

/**
 * @desc Generate JWT Token
 * Ensure JWT_SECRET is defined in your .env file
 */
const generateToken = (id, role) => {
    if (!process.env.JWT_SECRET) {
        console.error("CRITICAL ERROR: JWT_SECRET is missing in .env");
    }
    return jwt.sign({ id, role }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d'
    });
};

// @route   POST /api/auth/signup
// @desc    Register a new user
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Check for missing fields (Prevents 400 Bad Request)
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide name, email and password' });
        }

        // 2. Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // 3. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'user' // Security: Default to user
        });

        if (user) {
            res.status(201).json({
                success: true,
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role)
            });
        }
    } catch (error) {
        console.error('Signup Error:', error.message);
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
});

// @route   POST /api/auth/login
// @desc    Auth user & get token
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validation (Prevents 400 Bad Request)
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        // 2. Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // 3. Check if password exists (for OAuth users)
        if (!user.password) {
            return res.status(400).json({ success: false, message: 'This account uses Google Login. Please login with Google.' });
        }

        // 4. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            res.json({
                success: true,
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role)
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login Error:', error.message); // Fixes 500 debugging
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
});

// @route   GET /api/auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @route   GET /api/auth/google/callback
router.get('/google/callback',
    // UPDATE: Added your vercel link in failureRedirect
    passport.authenticate('google', { failureRedirect: 'https://internxbysadik.vercel.app/login', session: false }),
    (req, res) => {
        const token = generateToken(req.user._id, req.user.role);
        // UPDATE: Added your vercel link in success redirect
        res.redirect(`https://internxbysadik.vercel.app/auth-success?token=${token}`);
    }
);

module.exports = router;
