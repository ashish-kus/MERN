import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connection done!!");
  } catch (error) {
    console.log("Can't connect to database X X X", error);
    process.exit(1);
  }
};
