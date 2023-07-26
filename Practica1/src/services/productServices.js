import ProductDaoMongoDB from "../daos/mongodb/productDao.js";

const productDao = new ProductDaoMongoDB();

// import ProductDaoFS from "../daos/filesystem/productDao.js";
// const prodDao = new ProductDaoFS();

export const getAllService = async () => {
  try {
    const response = await productDao.getAllProducts();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getByIdService = async (id) => {
  try {
    const item = await productDao.getProductById(id);
    if (!item) {
      return false;
    } else return item;
  } catch (error) {
    console.log(error);
  }
};

export const createService = async (obj) => {
  try {
    const newProduct = await productDao.createProduct(obj);
    if (!newProduct) return false;
    else return newProduct;
  } catch (error) {
    console.log(error);
  }
};

export const updateService = async (id, obj) => {
  try {
    const item = await productDao.updateProduct(id, obj);
    return item;
  } catch (error) {
    console.log(error);
  }
};

export const deleteService = async (id) => {
  try {
    const response = await productDao.deleteProduct(id);
    return response;
  } catch (error) {
    console.log(error);
  }
};
