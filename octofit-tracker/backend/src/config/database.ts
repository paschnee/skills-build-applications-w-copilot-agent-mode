import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB at', connectionString);
    return true;
  } catch (error) {
    console.warn('MongoDB connection failed. Continuing in demo mode.', error);
    return false;
  }
}

export default mongoose.connection;
