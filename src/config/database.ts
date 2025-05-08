import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    // Use hardcoded MongoDB URI
    const mongoURI = 'mongodb+srv://kayeddy:1477@cluster0.crlf7.mongodb.net/devops_api?retryWrites=true&w=majority&appName=Cluster0';
    
    // Log connection attempt
    console.log(`Attempting to connect to MongoDB at ${mongoURI.split('@')[1] || 'configured URI'}`);
    
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