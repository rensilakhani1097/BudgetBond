const express = require('express');
const router = express.Router();
const Category = require('../models/category.model');


router.post('/create', async (req, res) => {
    try {
      // const users = await Category.find();
      // res.json(users);
      const category = new Category(req.body);
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
  );
  module.exports = router;