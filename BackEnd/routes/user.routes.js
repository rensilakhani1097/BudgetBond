const express = require('express');
const router = express.Router();
const User = require('../models/user.model'); // Import User model

// Create a new user
// router.post('/', async (req, res) => {
//   try {
//     const newUser = new User(req.body);
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('roleId').populate('headOfFamilyId');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
