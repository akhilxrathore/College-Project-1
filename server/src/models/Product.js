const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please enter product description'],
    },
    price: {
      type: Number,
      required: [true, 'Please enter product price'],
      default: 0.0,
    },
    originalPrice: {
      type: Number,
      default: null,
    },
    category: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, 'Please select a product category'],
    },
    stock: {
      type: Number,
      required: [true, 'Please enter product stock'],
      default: 10,
    },
    imageUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    },
    image: {
      type: String,
      default: '',
    },
    brand: {
      type: String,
      default: 'ShopSphere',
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    badge: {
      type: String,
      default: '',
      trim: true,
    },
    isNewProduct: {
      type: Boolean,
      default: false,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for inStock boolean
productSchema.virtual('inStock').get(function () {
  return this.stock > 0;
});

// Virtual for discount percentage
productSchema.virtual('discount').get(function () {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Pre-save hook to keep image and reviewCount fields synchronized
productSchema.pre('save', function (next) {
  if (!this.image && this.imageUrl) {
    this.image = this.imageUrl;
  }
  if (!this.imageUrl && this.image) {
    this.imageUrl = this.image;
  }
  if (this.reviewCount && !this.numReviews) {
    this.numReviews = this.reviewCount;
  }
  if (this.numReviews && !this.reviewCount) {
    this.reviewCount = this.numReviews;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
