const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const crypto = require('crypto'); // For generating the secret key
const User = require('../models/user.model');

// Register new user
// router.post('/register', [
//   check('email', 'Please provide a valid email').isEmail(),
//   check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
// ], async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//   const { firstname, lastname, email, password, mobileno, address, username } = req.body;

//   try {
//     // Check if the user already exists
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: 'User already exists' });

//     // Create new user
//     user = new User({
//       firstname,
//       lastname,
//       email,
//       password,
//       mobileno,
//       address,
//       username
//     });

//     await user.save();

//     // Generate JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

//     // Return token and secret key
//     res.status(201).json({ token, secret_key: user.secret_key });

//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server error');
//   }
// });

exports.successGoogleLogin = (req , res) => { 
	if(!req.user) 
		res.redirect('/failure'); 
    console.log(req.user);
	res.send("Welcome " + req.user.email); 
}

exports.failureGoogleLogin = (req , res) => { 
	res.send("Error"); 
}



exports.login = async (req,ress) =>{
  try{
    check('email', 'Please provide a valid email').isEmail();
    check('password', 'Password is required').exists();
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.status(200).json({ token });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
  }catch(error){

  }
}



