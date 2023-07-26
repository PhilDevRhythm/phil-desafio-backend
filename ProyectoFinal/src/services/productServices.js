import ProductDao from "../daos/mongodb/productDao.js";

const productDaoMongoDB = new ProductDao();

export const getAll = async () => {
  try {
    const response = await productDaoMongoDB.getAll();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (id) => {
  try {
    const item = await productDaoMongoDB.getById(id);
    if (!item) {
      return false;
    } else return item;
  } catch (error) {
    console.log(error);
  }
};

export const create = async (obj) => {
  try {
    const newProduct = await productDaoMongoDB.create(obj);
    if (!newProduct) return false;
    else return newProduct;
  } catch (error) {
    console.log(error);
  }
};

export const update = async (id, obj) => {
  try {
    const item = await productDaoMongoDB.update(id, obj);
    return item;
  } catch (error) {
    console.log(error);
  }
};

export const erase = async (id) => {
  try {
    const response = await productDaoMongoDB.delete(id);
    return response;
  } catch (error) {
    console.log(error);
  }
};
