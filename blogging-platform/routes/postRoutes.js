const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    createPost,
    getAllPosts,
    getPostsByCategory,
    getTrendingPosts
} = require('../controllers/postController');

// Public Routes
router.get('/', getAllPosts);
router.get('/category/:categoryName', getPostsByCategory);
router.get('/trending', getTrendingPosts);

// Protected Route to create post
router.post('/', protect, createPost);

module.exports = router;