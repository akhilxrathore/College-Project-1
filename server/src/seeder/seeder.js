const dotenv = require('dotenv');
const connectDB = require('../config/db');
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const { categories, sampleProducts } = require('./sampleData');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    const createdCategories = await Category.insertMany(categories);
    const electronicsId = createdCategories[0]._id;

    const sampleProductsWithCategory = sampleProducts.map((p) => ({
      ...p,
      category: electronicsId,
    }));

    await Product.insertMany(sampleProductsWithCategory);

    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Seeding Failed: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  // Destroy logic if needed
} else {
  importData();
}
