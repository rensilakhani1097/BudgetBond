

const User = require('../models/user.model');


exports.createUser = async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
 exports.updateUser =  async (req, res) => {
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
  };
  
  exports.GetUser = async (req, res) => {
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
  };
  
 exports.ActiveUser =  async (req, res) => {
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
  };
  
  exports.InactiveUser = async (req, res) => {
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
  };
  
  exports.GetAllUser = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };