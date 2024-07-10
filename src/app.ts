import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import post from './routes/post';
import auth from './routes/auth';
import user from './routes/user';

const app = express();
config();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/posts', post);
app.use('/api/auth', auth);
app.use('/api/users', user);

// Connect to MongoDB
const uri = process.env.MONGODB_URI as string;
mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) =>
    console.error('Error connecting to MongoDB:', error.message)
  );
