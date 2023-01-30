import mongoose from "mongoose";
import config from "../config.js";

const connectDB = async () =>
{
    try {
        const con = await mongoose.connect(config.MONGODB_URL, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        });
        console.log("mongodb connected")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

export default connectDB