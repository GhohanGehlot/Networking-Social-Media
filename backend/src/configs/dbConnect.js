import mongoose from "mongoose";
import AppError from "../utils/appError.js";
import { MONGO_URI } from "../constant.js";

const connectDb = async () => {
    try {
      const connection = await mongoose.connect(MONGO_URI);
      console.log("Mongo Db connected " + connection.connection.host);
    } catch (error) {
        throw new AppError("Unable to connect DB" , 500)
    }
}

export default connectDb;