const jwt = require('jsonwebtoken');

const generateToken = (userId, roleId) => {
  return jwt.sign(
    { id: userId, role: roleId },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

module.exports = generateToken;