const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const ApiError = require('../utils/apiError');
const { inMemoryUsers } = require('../controllers/authController');

// Middleware to protect routes via JWT token
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized, token missing');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'shopsphere_super_secret_jwt_key_2026');

    if (mongoose.connection.readyState === 1) {
      req.user = await User.findById(decoded.id).select('-password');
    } else {
      // Memory fallback lookup
      for (const u of inMemoryUsers.values()) {
        if (u._id.toString() === decoded.id.toString()) {
          const { password, ...userNoPass } = u;
          req.user = userNoPass;
          break;
        }
      }
    }

    if (!req.user) {
      throw new ApiError(401, 'Not authorized, user not found');
    }

    next();
  } catch (error) {
    throw new ApiError(401, 'Not authorized, token verification failed');
  }
});

// Middleware for Admin Role Authorization
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    throw new ApiError(403, 'Forbidden, admin privileges required');
  }
};

module.exports = { protect, admin };
