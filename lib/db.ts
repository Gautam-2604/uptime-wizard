import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
const mongo_uri = process.env.MONGODB_URL || "";

async function connectDB() {
      try {
        await mongoose.connect(mongo_uri);
        console.log('Connected to MongoDB successfully!');
      } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
      }
    }

    export default connectDB;