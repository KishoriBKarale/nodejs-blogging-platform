const Category = require('../models/Category');

// Create Category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.create({ name });

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};