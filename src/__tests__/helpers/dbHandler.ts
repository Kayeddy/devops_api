import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

export const connect = async () => {
  mongoServer = await MongoMemoryServer.create({
    binary: {
      version: '7.0.3',
    },
    instance: {
      args: ['--setParameter', 'maxTransactionLockRequestTimeoutMillis=5000'],
      port: 27017,
      dbName: 'test',
    },
  });
  const mongoUri = mongoServer.getUri();
  
  // Increase timeout for Mongoose operations
  const mongooseOpts = {
    serverSelectionTimeoutMS: 60000, // 1 minute
    socketTimeoutMS: 60000,
    connectTimeoutMS: 60000,
  };
  
  await mongoose.connect(mongoUri, mongooseOpts);
};

export const closeDatabase = async () => {
  try {
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
  } catch (error) {
    console.error('Error closing database:', error);
  }
};

export const clearDatabase = async () => {
  try {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  } catch (error) {
    console.error('Error clearing database:', error);
  }
}; 