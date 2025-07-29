const express = require('express');
const router = express.Router();
const { getProfile, getUsers } = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');

// @route GET /api/users/me
router.get('/me', protect, getProfile);

// @route GET /api/admin/users
router.get('/admin/users', protect, admin, getUsers);

module.exports = router;