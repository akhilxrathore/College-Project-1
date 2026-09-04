const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');

// @desc    Fetch all products with filtering & pagination
// @route   GET /api/v1/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .populate('category', 'name slug')
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json(
    new ApiResponse(200, { products, page, pages: Math.ceil(count / pageSize), total: count }, 'Products fetched successfully')
  );
});

// @desc    Fetch single product by ID
// @route   GET /api/v1/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category', 'name slug');
  if (product) {
    res.json(new ApiResponse(200, product, 'Product details fetched'));
  } else {
    throw new ApiError(404, 'Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/v1/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category, stock, imageUrl } = req.body;

  const product = new Product({
    name,
    price,
    description,
    category,
    stock,
    imageUrl: imageUrl || '/images/sample.jpg',
  });

  const createdProduct = await product.save();
  res.status(201).json(new ApiResponse(201, createdProduct, 'Product created successfully'));
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};
