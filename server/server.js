const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session'); 
const passport = require('passport');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Passport Config load
require('./config/passport');

// 1. Middlewares
app.set('trust proxy', 1);

// CORS Config: Trailing slash remove kiya hai (http://localhost:5173/)
app.use(cors({ 
    origin: 'https://internxai.vercel.app', 
    credentials: true 
})); 
app.use(express.json());

// 2. Session Setup (Production-ready cookies)
app.use(session({
    secret: process.env.SESSION_SECRET || 'internx_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        // Localhost par 'secure: false' zaroori hai login session chalne ke liye
        secure: process.env.NODE_ENV === 'production', 
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));

// 3. Passport Initialize
app.use(passport.initialize());
app.use(passport.session());

// 4. Request Logging (Debugging ke liye best hai)
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// --- ROUTES ---
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/events', require('./routes/events')); // Events ke liye
app.use('/api/internships', require('./routes/internships')); // Internship management
app.use('/api/applications', require('./routes/applications'));
app.use('/api/users', require('./routes/users'));

// GEMINI AI ROUTE (Automation ke liye)
app.use('/api/jobs', require('./routes/jobRoutes')); 

app.get('/', (req, res) => res.send('College Aggregator API is running'));

// 5. Global Error Handler (Gemini parsing ya DB errors catch karne ke liye)
app.use((err, req, res, next) => {
    console.error('💥 Server Error:', err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something went wrong on the server!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
});
