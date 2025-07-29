const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { addComment } = require('../controllers/commentController');

// Add comment to post
router.post('/:postId/comments', protect, addComment);

module.exports = router;