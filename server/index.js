// server/index.js
import authRoutes from './routes/auth.js';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
await connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('API running'));
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
