const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');

// In-memory fallback database for development when MongoDB is offline
const inMemoryUsers = new Map();

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !name.trim()) {
    throw new ApiError(400, 'Please provide your name');
  }

  if (!email || !email.trim()) {
    throw new ApiError(400, 'Please provide your email');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, 'Please provide a valid email address');
  }

  if (!password || password.length < 6) {
    throw new ApiError(400, 'Password must be at least 6 characters long');
  }

  const normalizedEmail = email.toLowerCase().trim();

  let userExists = false;
  if (mongoose.connection.readyState === 1) {
    userExists = await User.findOne({ email: normalizedEmail });
  } else {
    userExists = inMemoryUsers.has(normalizedEmail);
  }

  if (userExists) {
    throw new ApiError(400, 'An account with this email already exists');
  }

  let user;
  if (mongoose.connection.readyState === 1) {
    user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = {
      _id: 'usr_' + Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    inMemoryUsers.set(normalizedEmail, user);
  }

  if (user) {
    const token = generateToken(res, user._id);
    res.status(201).json(
      new ApiResponse(
        201,
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          token,
        },
        'User registered successfully'
      )
    );
  } else {
    throw new ApiError(400, 'Invalid user data provided');
  }
});

// @desc    Auth user & get token
// @route   POST /api/v1/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !email.trim() || !password) {
    throw new ApiError(400, 'Please provide both email and password');
  }

  const normalizedEmail = email.toLowerCase().trim();
  let user;
  let isMatch = false;

  if (mongoose.connection.readyState === 1) {
    user = await User.findOne({ email: normalizedEmail }).select('+password');
    if (user) {
      isMatch = await user.matchPassword(password);
    }
  } else {
    user = inMemoryUsers.get(normalizedEmail);
    if (user) {
      isMatch = await bcrypt.compare(password, user.password);
    }
  }

  if (user && isMatch) {
    const token = generateToken(res, user._id);
    res.json(
      new ApiResponse(
        200,
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          token,
        },
        'User logged in successfully'
      )
    );
  } else {
    throw new ApiError(401, 'Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/v1/auth/profile or GET /api/v1/auth/me
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  let user;
  if (mongoose.connection.readyState === 1) {
    user = await User.findById(req.user._id);
  } else {
    user = req.user;
  }

  if (user) {
    const { password, ...userObj } = user.toObject ? user.toObject() : user;
    res.json(new ApiResponse(200, userObj, 'User profile fetched'));
  } else {
    throw new ApiError(404, 'User not found');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/v1/auth/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.json(new ApiResponse(200, {}, 'User logged out successfully'));
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
  inMemoryUsers,
};
