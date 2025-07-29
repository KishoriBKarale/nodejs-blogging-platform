const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { createCategory, getAllCategories } = require('../controllers/categoryController');

// Only admin can create categories
router.post('/', protect, admin, createCategory);
router.get('/', getAllCategories);

module.exports = router;