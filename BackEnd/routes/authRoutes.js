const express = require('express');
const router = express.Router();
const { googleOAuth } = require('../controller/authController');

// Google OAuth route
router.post('/auth/google', googleOAuth);

module.exports = router;
