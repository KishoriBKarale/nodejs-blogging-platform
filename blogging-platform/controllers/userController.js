const User = require('../models/User');

// Get Profile
exports.getProfile = async (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role.name
  });
};

// Get all Users
exports.getUsers = async (req, res, next) => {
  try {
    const { role } = req.query; // Get role from query param (e.g., ?role=admin)
    let query = {};

    if (role) {
      // First, find the role document by name
      const Role = require('../models/Role');
      const foundRole = await Role.findOne({ name: role.toLowerCase() });

      if (!foundRole) {
        return res.status(404).json({ message: `Role '${role}' not found.` });
      }

      query.role = foundRole._id;
    }

    const users = await User.find(query)
      .select('-password')              // Exclude password from response
      .populate('role', 'name');        // Populate role name

    res.status(200).json(users);
  } catch (error) {
    next(error); // Pass error to centralized error handler
  }
};