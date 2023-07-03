import fs, { accessSync } from "fs";
import { __dirname } from "../utils.js";

const pathFile = __dirname + "/db/products.json";

export const createProduct = async (obj) => {
  try {
    const product = {
      id: (await getMaxID()) + 1,
      ...obj,
    };
    const prodList = await getProducts();
    prodList.push(product);
    await fs.promises.writeFile(pathFile, JSON.stringify(prodList));
    return product;
  } catch (error) {
    console.log(error);
  }
};
export const getMaxID = async () => {
  let maxId = 0;
  const products = await getProducts();
  products.map((product) => {
    if (product.id > maxId) maxId = product.id;
  });
  return maxId;
};
export const getProducts = async () => {
  try {
    if (fs.existsSync(pathFile)) {
      const products = await fs.readFileSync(pathFile);
      const productsJSON = JSON.parse(products);
      return productsJSON;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};
export const getProductById = async (id) => {
  try {
    const prodList = await getProducts();
    const products = prodList.find((product) => product.id === id);
    if (products) return products;
    else return false;
  } catch (error) {
    console.log(error);
  }
};
export const updateProduct = async (id, obj) => {
  try {
    const prodList = await getProducts();
    const index = prodList.findIndex((product) => product.id === id);
    if (index === -1) {
      console.log("id not found");
    } else {
      prodList[index] = { ...obj, id };
    }
    await fs.promises.writeFile(pathFile, JSON.stringify(prodList));
  } catch (error) {
    console.log(error);
  }
};
export const deleteProduct = async (id) => {
  try {
    const prodList = await getProducts();
    if (prodList) {
      const newArray = prodList.filter((product) => product.id !== id);
      await fs.promises.writeFile(pathFile, JSON.stringify(newArray));
    } else {
      throw new Error("No product found");
    }
  } catch (error) {
    console.log(error);
  }
};
export const topLimit = async (limit) => {
  try {
    const products = await getProducts();
    const topProducts = products.slice(0, limit);
    return topProducts;
  } catch (error) {
    console.log(error);
  }
};
