const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shopsphere', {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ Database Connection Warning: ${error.message}`);
    console.warn(`💡 Tip: Ensure MongoDB service is running or set MONGO_URI in server/.env`);
  }
};

module.exports = connectDB;
