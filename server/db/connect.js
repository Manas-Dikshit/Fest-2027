import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
  if (!process.env.MONGO) {
    console.log("No MONGO set - running without a database".bgYellow);
    return;
  }
  try {
    const connect = await mongoose.connect(process.env.MONGO, {
      connectTimeoutMS: 10000,
    });
    console.log(
      `Connected to Mongodb database : ${connect.connection.name}`.bgGreen
    );
  } catch (error) {
    console.log(`Error in mongoDB ${error}`.bgRed);
  }
};

export default connectDB;