const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Add Comment
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = await Comment.create({
      text,
      post: post._id,
      author: req.user._id
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};