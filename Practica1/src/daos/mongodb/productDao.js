import { ProductModel } from "./models/productModel.js";

export default class ProductDaoMongoDB {
  async getAllProducts() {
    try {
      const response = await ProductModel.findOne({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async getProductById(id) {
    try {
      await ProductModel.findById(id);
    } catch (error) {}
  }
  async createProduct(obj) {
    try {
      const response = await ProductModel.create(obj);
      return response;
    } catch (error) {}
  }
  async updateProduct(id, obj) {
    try {
      await ProductModel.findByIdAndUpdate(id, obj, { new: true });
      return obj;
    } catch (error) {}
  }
  async deleteProduct(id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id);
      return response;
    } catch (error) {}
  }
}
