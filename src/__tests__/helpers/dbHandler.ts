import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

export const connect = async () => {
  mongoServer = await MongoMemoryServer.create({
    binary: {
      version: '7.0.3'
    }
  });
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
};

export const closeDatabase = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
}; 