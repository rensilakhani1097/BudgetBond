const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google OAuth login/sign-up
exports.googleOAuth = async (req, res) => {
    const { idToken } = req.body;

    try {
        // Verify Google ID token
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();

        const { email, sub: googleId, name } = payload;

        // Check if user already exists
        let user = await User.findOne({ email });

        if (!user) {
            // If user doesn't exist, create a new user
            user = new User({
                username: email,
                firstname: name.split(' ')[0],
                lastname: name.split(' ')[1] || '',
                email: email,
                googleId: googleId,
                status: 'Active'
            });
            await user.save();
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(200).json({ token });

    } catch (error) {
        console.error('Error during Google OAuth:', error);
        res.status(400).json({ message: 'Google OAuth failed', error });
    }
};
