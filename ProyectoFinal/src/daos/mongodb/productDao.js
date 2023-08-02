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
  async getAllPaginated({
    limit = 10,
    sortOrder = "asc",
    category = null,
    page = 1,
    available = null,
  } = {}) {
    try {
      const query = {
        ...(category !== null && { category: { $eq: category } }),
        ...(available !== null && {
          stock: { ...(available ? { $gt: 0 } : { $eq: 0 }) },
        }),
      };

      console.log(query);

      const response = await productModel.paginate(query, {
        page,
        limit,
        sort: { price: sortOrder },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
