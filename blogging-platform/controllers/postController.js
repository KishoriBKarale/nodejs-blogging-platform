const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Category = require('../models/Category');

// Create new blog post
exports.createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const categoryData = await Category.findOne({ name: category });

    if (!categoryData) {
      return res.status(400).json({ message: 'Category not found' });
    }

    const post = await Post.create({
      title,
      content,
      author: req.user._id,
      category: categoryData._id
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all posts with comments
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email')
      .populate('category', 'name')
      .lean();

    for (const post of posts) {
      post.comments = await Comment.find({ post: post._id }).populate('author', 'name');
    }

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get posts by category
exports.getPostsByCategory = async (req, res) => {
  try {
    const categoryData = await Category.findOne({ name: req.params.categoryName });

    if (!categoryData) {
      return res.status(400).json({ message: 'Category not found' });
    }

    const posts = await Post.find({ category: categoryData._id })
      .populate('author', 'name email')
      .populate('category', 'name');

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//-------------------------------------------------------------------------------------

// Trending posts (top 5 with most comments)
exports.getTrendingPosts = async (req, res) => {
  try {
    const trending = await Post.aggregate([
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'post',
          as: 'comments'
        }
      },
      {
        $addFields: { commentsCount: { $size: '$comments' } }
      },
      { $sort: { commentsCount: -1 } },
      { $limit: 5 }
    ]);

    res.json(trending);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};