import mongoose from "mongoose";

export const connectionString = "mongodb://localhost:27017/products";

try {
  await mongoose.connect(connectionString);
  console.log("conectado a Mongo DB");
} catch (error) {
  console.log(error);
}
