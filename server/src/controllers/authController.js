const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, 'User already exists with this email');
  }

  const user = await User.create({ name, email, password });
  if (user) {
    const token = generateToken(res, user._id);
    res.status(201).json(
      new ApiResponse(201, {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      }, 'User registered successfully')
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

  const user = await User.findOne({ email }).select('+password');
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(res, user._id);
    res.json(
      new ApiResponse(200, {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      }, 'User logged in successfully')
    );
  } else {
    throw new ApiError(401, 'Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/v1/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json(new ApiResponse(200, user, 'User profile fetched'));
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
};
