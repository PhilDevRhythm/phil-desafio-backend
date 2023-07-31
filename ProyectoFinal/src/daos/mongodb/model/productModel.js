import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  _id: String,
  name: { type: String, required: true, index: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

export const ProductModel = mongoose.model("products", productSchema);
