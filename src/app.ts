import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import userRoutes from './routes/userRoutes';
import bikeRoutes from './routes/bikeRoutes';
import carRoutes from './routes/carRoutes';
import healthRoutes from './routes/healthRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint for Railway - independent of MongoDB connection
app.get('/health', (req, res) => {
  console.log('Health check endpoint called at', new Date().toISOString());
  res.status(200).json({
    status: 'ok',
    message: 'API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.3.4'
  });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/bikes', bikeRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/health', healthRoutes);

// Start the server immediately for healthchecks
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Connect to MongoDB
connectDB().then(() => {
  console.log('MongoDB connected successfully, API is fully operational');
}).catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
  // Don't exit the process, let the health endpoint still work
  console.log('API is running in limited mode without database connection');
}); 