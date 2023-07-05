import fs, { accessSync } from "fs";
import { __dirname } from "../utils.js";
import { getProducts, getProductById } from "./prodManager.js";

const pathFile = __dirname + "/db/carts.JSON";

// GET ID for Carts
export const getMaxCartId = async () => {
  const carts = await getCarts();
  const lenght = carts.length;

  if (lenght > 0) {
    console.log(lenght);
    return lenght;
  } else {
    return 0;
  }
};
// GET Carts
export const getCarts = async () => {
  try {
    if (fs.existsSync(pathFile)) {
      const carts = await fs.promises.readFile(pathFile, "utf-8");
      const cartsJSON = JSON.parse(carts);
      return cartsJSON;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};
// CREATE CART
export const createCart = async () => {
  try {
    const cartsFile = await getCarts();
    const cart = {
      id: (await getMaxCartId()) + 1,
      products: [],
    };
    cartsFile.push(cart);
    await fs.promises.writeFile(pathFile, JSON.stringify(cartsFile));
    return cart;
  } catch (error) {
    console.log(error);
  }
};
// CHOOSE CART
export const getCartById = async (id) => {
  try {
    const cartsFile = await getCarts();
    const cart = cartsFile.find((cart) => cart.id === id);
    if (cart) {
      return cart.products;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
// UPPATE CART

export const updateCart = async (cartId, productId) => {
  try {
    const cartProd = {
      productId,
      quantity: 1,
    };
    if (!cartProd) {
      return "No product chosen to add to cart";
    } else {
      const carts = await getCarts();
      const cartIndex = carts.findIndex((cart) => cart.id === cartId);
      if (cartIndex > -1) {
        const prodIndex = carts[cartIndex].products.findIndex(
          (product) => product.productId === cartProd.productId
        );
        if (prodIndex > -1) {
          cartsFile[cartIndex].products[prodIndex].quantity++;
        } else {
          cartsFile[cartIndex].products.push(cartProd);
        }
        await fs.promises.writeFile(pathFile, JSON.stringify(cartsFile));
        return `Cart ${cartId} updated successfully`;
      } else {
        return "Cart ID doesn´t exist";
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteCart = async (cartId) => {
  try {
    const carts = await getCarts();
    // const idPosition = cartsFile.findIndex(cart => cart.id === cartId);
    if (carts) {
      const newCarts = carts.filter((cart) => cart.id !== cartId);
      await fs.promises.writeFile(pathFile, JSON.stringify(newCarts));
      return `Cart ${cartId} has been removed`;
    } else {
      return "Unable to remove";
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveProdtoCart = async (cartId, productId) => {
  try {
    const cartsFile = await getCarts();
    const existsCart = await getCartById(cartId);
    const existProdinCart = await getProductByID(productId);
    if (existProdinCart) {
      if (existsCart) {
        const existProdinCart = existsCart.products.find(
          (product) => product.id === productId
        );
        if (existProdinCart) {
          existProdinCart.quantity + 1;
        } else {
          const product = {
            id: productId,
            quantity: 1,
          };
          existsCart.products.push(product);
        }
        await fs.promises.writeFile(pathFile, JSON.stringify(cartsFile));
        return existsCart;
      } else {
        throw new Error("Product " + productId + "NOT FOUND");
      }
    }
  } catch (error) {}
};
