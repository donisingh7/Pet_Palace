// // server/config/db.js
// import mongoose from 'mongoose';

// export default async function connectDB() {
//   await mongoose.connect(process.env.MONGO_URI_DEV, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   console.log('✅ MongoDB connected');
// }
// PET_PALACE/server/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in .env');
  }
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('🗄️  MongoDB connected:', mongoose.connection.name);
};

module.exports = connectDB;
