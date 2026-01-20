const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // 1. Google ID se check karein
            let user = await User.findOne({ googleId: profile.id });
            if (user) return done(null, user);

            // 2. Email se link karein
            if (profile.emails && profile.emails.length > 0) {
                user = await User.findOne({ email: profile.emails[0].value });
                if (user) {
                    user.googleId = profile.id;
                    await user.save();
                    return done(null, user);
                }
            }

            // 3. Naya user create karein
            user = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                role: 'user'
            });
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    }));
}