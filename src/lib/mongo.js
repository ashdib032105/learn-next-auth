import mongoose from "mongoose";

export async function dbConnect() {
  try {
    let conn = await mongoose.connect(
      String(process.env.MONGO_DB_CONNECTION_STRING)
    );
    return conn;
  } catch (error) {
    console.log(error.message);
  }
}
