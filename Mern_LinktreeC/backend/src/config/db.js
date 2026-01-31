// src/config/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // This MUST match the key in your .env file
    const uri = process.env.MONGO_URI;

    await mongoose.connect(uri);
    console.log("✅ MongoDB Local Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};
