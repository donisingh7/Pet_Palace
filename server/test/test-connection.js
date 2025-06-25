// PET_PALACE/server/test/test-connection.js
require('dotenv').config();            // यह automatically server/.env पढ़ेगा
const connectDB = require('../config/db');

(async () => {
  try {
    await connectDB();
    console.log('✅ Successfully connected to MongoDB Atlas');
    process.exit(0);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
})();
