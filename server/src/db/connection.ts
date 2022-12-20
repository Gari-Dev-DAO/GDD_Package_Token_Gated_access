import dotenv from 'dotenv';
dotenv.config();
import mongoose, { Connection } from 'mongoose';

const URI = process.env.MONGO_URI as string;
export const initConnection = (): Connection => {
  mongoose.connect(URI);
  const connection = mongoose.connection;
  return connection;
};
