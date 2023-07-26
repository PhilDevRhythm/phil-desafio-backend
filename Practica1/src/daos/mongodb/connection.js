import mongoose from "mongoose";

const connectionString = "mongodb://localhost:27017/products";

try {
  await mongoose.connect(connectionString);
  console.log("conectado a DB");
} catch (error) {
  console.log(error);
}
