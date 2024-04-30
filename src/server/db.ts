import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

export let mongo: MongoMemoryServer;

export const connectDB = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri);
};
