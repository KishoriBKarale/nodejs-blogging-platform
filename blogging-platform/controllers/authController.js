const User = require('../models/User');
const Role = require('../models/Role');
const generateToken = require('../utils/generateToken');

// Create User
exports.register = async (req, res) => {
  try {
    const { name, email, password, role: roleName = 'user' } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Find the role by name (default to 'user' if not provided)
    let role = await Role.findOne({ name: roleName });

    if (!role) {
      role = await Role.create({ name: roleName });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role._id
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id, user.role)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate('role');

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role.name,
      token: generateToken(user._id, user.role._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};