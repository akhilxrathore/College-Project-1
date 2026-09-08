const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const Category = require('../models/Category');
const { categories, sampleProducts } = require('./sampleData');

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    if (mongoose.connection.readyState !== 1) {
      console.log('⚠️ MongoDB is not connected. Seed script skipped (will use in-memory seed data).');
      process.exit(0);
    }

    // Clear existing categories and products safely
    await Product.deleteMany();
    await Category.deleteMany();

    // Insert categories
    const createdCategories = await Category.insertMany(categories);
    const categoryMap = {};
    createdCategories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    // Map products to Category ObjectId or Category Name string
    const productsToInsert = sampleProducts.map((p) => {
      const { _id, ...productWithoutCustomId } = p;
      return {
        ...productWithoutCustomId,
        category: categoryMap[p.category] || p.category,
      };
    });

    const insertedProducts = await Product.insertMany(productsToInsert);

    console.log(`✅ Successfully seeded ${createdCategories.length} categories and ${insertedProducts.length} products into MongoDB!`);
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding Failed: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    if (mongoose.connection.readyState === 1) {
      await Product.deleteMany();
      await Category.deleteMany();
      console.log('✅ Product and Category data destroyed!');
    }
    process.exit(0);
  } catch (error) {
    console.error(`❌ Destroy Failed: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
