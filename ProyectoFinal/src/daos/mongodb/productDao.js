import { productModel } from "./model/productModel.js";
// import mongoose from "mongoose";

export default class productDaoMongoDB {
  async getAll() {
    try {
      const response = await productModel.find({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id) {
    try {
      const response = await productModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async create(obj) {
    try {
      const response = await productModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async update(id, obj) {
    try {
      const response = await productModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async delete(obj) {
    try {
      const response = await productModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllProdWithPages({
    limit = 2,
    sortOrder = "asc",
    page = 1,
  } = {}) {
    try {
      const response = await productModel.paginate(
        {},
        {
          page,
          limit,
          sort: { price: sortOrder },
        }
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
