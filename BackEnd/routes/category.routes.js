// routes/category.routes.js
const express = require('express');
const router = express.Router();
const {createCategory,
       getAllCategories,
       getCategoryById,
       updateCategory,
       deleteCategory
} = require('../controller/categoryController');

router.route('/create').post(createCategory);
router.route('/').get(getAllCategories);
router.route('/:id').get(getCategoryById).patch(updateCategory).delete(deleteCategory);

module.exports = router;