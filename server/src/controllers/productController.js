const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');
const { sampleProducts } = require('../seeder/sampleData');

// In-memory fallback product database for offline/demo usage
let inMemoryProducts = [...sampleProducts];

// @desc    Fetch all products with filtering, search, sorting & pagination
// @route   GET /api/v1/products or GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.limit) || Number(req.query.pageSize) || 50;
  const page = Number(req.query.page) || Number(req.query.pageNumber) || 1;

  const search = req.query.search || req.query.keyword || '';
  const category = req.query.category || '';
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : null;
  const minRating = req.query.minRating ? Number(req.query.minRating) : 0;
  const inStockOnly = req.query.inStock === 'true';
  const featuredOnly = req.query.featured === 'true';
  const sort = req.query.sort || 'newest';

  let products = [];
  let count = 0;

  if (mongoose.connection.readyState === 1) {
    // MongoDB Query Construction
    const filter = {};

    if (search.trim()) {
      filter.$or = [
        { name: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
        { brand: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    if (category && category !== 'All' && category !== 'all') {
      filter.category = { $regex: `^${category.trim()}$`, $options: 'i' };
    }

    if (maxPrice !== null && !isNaN(maxPrice)) {
      filter.price = { $lte: maxPrice };
    }

    if (minRating > 0) {
      filter.rating = { $gte: minRating };
    }

    if (inStockOnly) {
      filter.stock = { $gt: 0 };
    }

    if (featuredOnly) {
      filter.featured = true;
    }

    // Sort options
    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc' || sort === 'price-low') {
      sortOption = { price: 1 };
    } else if (sort === 'price_desc' || sort === 'price-high') {
      sortOption = { price: -1 };
    } else if (sort === 'rating') {
      sortOption = { rating: -1 };
    } else if (sort === 'newest') {
      sortOption = { createdAt: -1, _id: -1 };
    }

    count = await Product.countDocuments(filter);
    products = await Product.find(filter)
      .sort(sortOption)
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  } else {
    // Fallback In-Memory Filtering
    let list = [...inMemoryProducts];

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          (typeof p.category === 'string' && p.category.toLowerCase().includes(q))
      );
    }

    if (category && category !== 'All' && category !== 'all') {
      list = list.filter((p) => {
        const catName = typeof p.category === 'string' ? p.category : p.category?.name || '';
        return catName.toLowerCase() === category.toLowerCase();
      });
    }

    if (maxPrice !== null && !isNaN(maxPrice)) {
      list = list.filter((p) => p.price <= maxPrice);
    }

    if (minRating > 0) {
      list = list.filter((p) => p.rating >= minRating);
    }

    if (inStockOnly) {
      list = list.filter((p) => p.stock > 0);
    }

    if (featuredOnly) {
      list = list.filter((p) => p.featured === true);
    }

    // Sort
    if (sort === 'price_asc' || sort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc' || sort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      list.sort((a, b) => b._id.localeCompare(a._id));
    }

    count = list.length;
    products = list.slice(pageSize * (page - 1), pageSize * page);
  }

  res.json(
    new ApiResponse(
      200,
      {
        products,
        page,
        pages: Math.ceil(count / pageSize) || 1,
        total: count,
      },
      'Products fetched successfully'
    )
  );
});

// @desc    Fetch single product by ID
// @route   GET /api/v1/products/:id or GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let product = null;

  if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
    product = await Product.findById(id);
  }

  if (!product) {
    product = inMemoryProducts.find((p) => p._id.toString() === id.toString());
  }

  if (product) {
    res.json(new ApiResponse(200, product, 'Product details fetched successfully'));
  } else {
    throw new ApiError(404, 'Product not found');
  }
});

// @desc    Create a new product
// @route   POST /api/v1/products or POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    originalPrice,
    category,
    stock,
    imageUrl,
    image,
    brand,
    featured,
    badge,
  } = req.body;

  if (!name || !name.trim()) {
    throw new ApiError(400, 'Please enter product name');
  }
  if (!description || !description.trim()) {
    throw new ApiError(400, 'Please enter product description');
  }
  if (price === undefined || isNaN(price) || price < 0) {
    throw new ApiError(400, 'Please enter a valid product price');
  }

  const finalImageUrl = imageUrl || image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80';

  let createdProduct;
  if (mongoose.connection.readyState === 1) {
    createdProduct = await Product.create({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      category: category || 'Electronics',
      stock: stock !== undefined ? Number(stock) : 10,
      imageUrl: finalImageUrl,
      image: finalImageUrl,
      brand: brand ? brand.trim() : 'ShopSphere',
      featured: Boolean(featured),
      badge: badge ? badge.trim() : '',
    });
  } else {
    createdProduct = {
      _id: 'p_' + Date.now(),
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      category: category || 'Electronics',
      stock: stock !== undefined ? Number(stock) : 10,
      imageUrl: finalImageUrl,
      image: finalImageUrl,
      brand: brand ? brand.trim() : 'ShopSphere',
      featured: Boolean(featured),
      badge: badge ? badge.trim() : '',
      rating: 4.5,
      reviewCount: 0,
      numReviews: 0,
      createdAt: new Date().toISOString(),
    };
    inMemoryProducts.unshift(createdProduct);
  }

  res.status(201).json(new ApiResponse(201, createdProduct, 'Product created successfully'));
});

// @desc    Update a product
// @route   PUT /api/v1/products/:id or PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    originalPrice,
    category,
    stock,
    imageUrl,
    image,
    brand,
    featured,
    badge,
  } = req.body;

  let product = null;

  if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
    product = await Product.findById(id);
    if (product) {
      if (name) product.name = name.trim();
      if (description) product.description = description.trim();
      if (price !== undefined) product.price = Number(price);
      if (originalPrice !== undefined) product.originalPrice = Number(originalPrice);
      if (category) product.category = category;
      if (stock !== undefined) product.stock = Number(stock);
      if (imageUrl || image) {
        product.imageUrl = imageUrl || image;
        product.image = imageUrl || image;
      }
      if (brand) product.brand = brand.trim();
      if (featured !== undefined) product.featured = Boolean(featured);
      if (badge !== undefined) product.badge = badge.trim();

      const updatedProduct = await product.save();
      return res.json(new ApiResponse(200, updatedProduct, 'Product updated successfully'));
    }
  }

  // Memory fallback update
  const memIndex = inMemoryProducts.findIndex((p) => p._id.toString() === id.toString());
  if (memIndex !== -1) {
    const existing = inMemoryProducts[memIndex];
    const updated = {
      ...existing,
      name: name ? name.trim() : existing.name,
      description: description ? description.trim() : existing.description,
      price: price !== undefined ? Number(price) : existing.price,
      originalPrice: originalPrice !== undefined ? Number(originalPrice) : existing.originalPrice,
      category: category || existing.category,
      stock: stock !== undefined ? Number(stock) : existing.stock,
      imageUrl: imageUrl || image || existing.imageUrl,
      image: imageUrl || image || existing.image,
      brand: brand ? brand.trim() : existing.brand,
      featured: featured !== undefined ? Boolean(featured) : existing.featured,
      badge: badge !== undefined ? badge.trim() : existing.badge,
    };
    inMemoryProducts[memIndex] = updated;
    return res.json(new ApiResponse(200, updated, 'Product updated successfully'));
  }

  throw new ApiError(404, 'Product not found');
});

// @desc    Delete a product
// @route   DELETE /api/v1/products/:id or DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let deleted = false;

  if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
    const product = await Product.findById(id);
    if (product) {
      await product.deleteOne();
      deleted = true;
    }
  }

  const memIndex = inMemoryProducts.findIndex((p) => p._id.toString() === id.toString());
  if (memIndex !== -1) {
    inMemoryProducts.splice(memIndex, 1);
    deleted = true;
  }

  if (deleted) {
    res.json(new ApiResponse(200, {}, 'Product deleted successfully'));
  } else {
    throw new ApiError(404, 'Product not found');
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  inMemoryProducts,
};
