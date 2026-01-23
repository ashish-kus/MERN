import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB cluster connected sucessfully");
  } catch (error) {
    console.error("ERROR WHILE CONNECTING DB", error);
    process.exit(1);
  }
};
