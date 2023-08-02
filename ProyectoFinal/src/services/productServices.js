import productDaoMongoDB from "../daos/mongodb/productDao.js";

const productDao = new productDaoMongoDB();

export const getAll = async () => {
  try {
    const response = await productDao.getAll();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (id) => {
  try {
    const item = await productDao.getById(id);
    // if (!item) return false;
    // else
    return item;
  } catch (error) {
    console.log(error);
  }
};

export const create = async (obj) => {
  try {
    const newProduct = await productDao.create(obj);
    if (!newProduct) return false;
    else return newProduct;
  } catch (error) {
    console.log(error);
  }
};

export const update = async (id, obj) => {
  try {
    const item = await productDao.update(id, obj);
    return item;
  } catch (error) {
    console.log(error);
  }
};

export const erase = async (id) => {
  try {
    const response = await productDao.delete(id);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPaginated = async (attributes) => {
  try {
    const response = await productDao.getAllPaginated(attributes);

    const result = {
      payload: response.docs,
      status: "success",
      page: response.page,
      totalPages: response.totalPages,
      prevPage: response.prevPage,
      nextPage: response.nextPage,
      hasPrevPage: response.hasPrevPage,
      hasNextPage: response.hasNextPage,
      prevLink: response.hasPrevPage
        ? `http://localhost:8080/views/products?page=${response.prevPage}`
        : null,
      nextLink: response.hasNextPage
        ? `http://localhost:8080/views/products?page=${response.nextPage}`
        : null,
    };

    return result;
  } catch (error) {
    console.log(error);
  }
};
