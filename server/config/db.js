// server/config/db.js
import mongoose from 'mongoose';

export default async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI_DEV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('✅ MongoDB connected');
}
