import mongoose from 'mongoose';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
export async function connectDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to MongoDB at', connectionString);
    }
    catch (error) {
        console.warn('MongoDB connection failed. Continuing in demo mode.', error);
    }
}
export default mongoose.connection;
