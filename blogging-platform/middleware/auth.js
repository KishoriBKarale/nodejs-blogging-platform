const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).populate('role');
      if (!req.user) return res.status(401).json({ message: 'User not found' });

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });
  }
};

// Middleware to check if user is Admin
const admin = (req, res, next) => {
  if (req.user.role.name !== 'admin') {
    return res.status(403).json({ message: 'Admin access only' });
  }
  next();
};

module.exports = { protect, admin };