import mongoose from "mongoose";
import logger from "./logger";
export const dbUrl = process.env.DATABASE;

async function connectDb() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(dbUrl!);
    logger.info("db connected");
  } catch (error) {
    logger.error("cold not connect to db", error);
    process.exit(1);
  }
}

export default connectDb;
