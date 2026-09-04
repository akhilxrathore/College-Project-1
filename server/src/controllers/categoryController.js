const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(new ApiResponse(200, categories, 'Categories fetched'));
});

// @desc    Create a category
// @route   POST /api/v1/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    throw new ApiError(400, 'Category already exists');
  }
  const category = await Category.create({ name, slug: name.toLowerCase().replace(/ /g, '-'), description });
  res.status(201).json(new ApiResponse(201, category, 'Category created'));
});

module.exports = { getCategories, createCategory };
