import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import {logger} from '../app';

// Load environment variables from .env file
dotenv.config();

// Define your database connection URI with a fallback value
const MONGODB_URI = process.env.MONGO_URL || undefined;

export const db = mongoose.connection

db.on('open', async () => {
logger.log('info', {message: `Connected to MongoDB successfully at ${new Date().toLocaleString()}` });
});

// Connect to MongoDB
async function dbConnect() {
  try {
    if (!MONGODB_URI) {
      throw new Error('MongoDB URI is not defined.');
    }
    
    await mongoose.connect(MONGODB_URI);
}
   catch (error) {
    console.error('MongoDB connection error:', error);
    logger.log('error', {message:  `Error connecting to MongoDB at ${new Date().toLocaleString()}` })
  }
}

// Call the dbConnect function to establish the connection
dbConnect();

// Export the database connection function
export default dbConnect;
