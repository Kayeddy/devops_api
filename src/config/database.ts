import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    // Get MongoDB URI from environment variables
    const mongoURI = process.env.MONGODB_URI;
    
    // Log connection attempt
    console.log(`Attempting to connect to MongoDB at ${mongoURI ? mongoURI.split('@')[1] || 'configured URI' : 'undefined URI'}`);
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }
    
    // Add connection options to handle Railway deployment
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      // Auto-retry connection on failure
      retryWrites: true,
      // Disable IPv6 to prevent ::1 connection attempts
      family: 4
    };

    await mongoose.connect(mongoURI, options);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Don't exit process with failure - let the app continue in limited mode
    throw error;
  }
};

export default connectDB; 