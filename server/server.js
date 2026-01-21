const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session'); 
const passport = require('passport');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Passport Config load karein
require('./config/passport');

// 1. Middlewares
// Render proxy ko trust karne ke liye (OAuth ke liye zaroori)
app.set('trust proxy', 1);

app.use(cors({ origin: 'https://internxbysadik.vercel.app', credentials: true })); 
app.use(express.json());

// 2. Session Setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'internx_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: true, // Render https use karta hai isliye true
        sameSite: 'none' 
    }
}));

// 3. Passport Initialize
app.use(passport.initialize());
app.use(passport.session());

// 4. Request Logging
app.use((req, res, next) => {
    console.log(`[Request] ${req.method} ${req.url}`);
    next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// --- ROUTES ---
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/events', require('./routes/events'));
app.use('/api/internships', require('./routes/internships'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/users', require('./routes/users'));

app.get('/', (req, res) => res.send('College Aggregator API is running'));

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
