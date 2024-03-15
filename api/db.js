import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// MONGOOSE SETUP
export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URL, {
      dbName: "amazon-react-native",
    });
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};
