import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.NEXT_PUBLIC_MONGO_URI;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) {
    console.log("Database connected through previous connection.");
    return cached.conn;
  }

  if (!MONGODB_URL) throw new Error("Missing MONGODB_URL");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "vido_quality",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
  console.log("Database is connected.");

  return cached.conn;
};
