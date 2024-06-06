import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return true;
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to connect to mongoDB");
  }
};

export default connectDB;
