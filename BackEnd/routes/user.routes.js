const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Category = require('../models/category.model');
// Create a new user
router.post('/create', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id/status/inactive', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id/status/active', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.status = 'Active';
    await user.save();
    res.json({ message: 'User status updated to Active', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.status = 'Inactive';
    await user.save();
    res.json({ message: 'User status updated to Inactive', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// router.post('/category/create', async (req, res) => {
//   try {
//     // const users = await Category.find();
//     // res.json(users);
//     const newUser = new Category(req.body);
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message })
//   }
// }
// );
module.exports = router;