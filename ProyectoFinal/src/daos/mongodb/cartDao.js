import { cartModel } from "./model/cartModel.js";
import { productModel } from "./model/productModel.js";

export const getAll = async () => {
  try {
    const carts = await cartModel.find();
    return carts;
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (id) => {
  try {
    const cart = await cartModel.findById(id).populate("items.product");
    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const create = async () => {
  try {
    const newCart = await cartModel.create({ products: [] });
    return newCart;
  } catch (error) {
    console.log(error);
  }
};

export const addProductToCart = async (id, productId) => {
  try {
    const product = await productModel.findById(productId);
    const cart = await cartModel.findById(id);
    const prodInCart = cart.items.find(
      (item) => item.product._id.toString() === product._id.toString()
    );

    if (prodInCart) prodInCart.quantity++;
    else
      cart.items.push({
        product,
        quantity: 1,
      });

    await cart.save();
    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const updateCartItems = async (id, items) => {
  try {
    const cart = await cartModel.findById(id);
    cart.items = items;
    await cart.save();
    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const updateProductQuantity = async (id, productId, quantity) => {
  try {
    const cart = await cartModel.findById(id);
    const prodInCart = cart.items.find(
      (item) => item.product._id.toString() === productId
    );

    if (prodInCart) prodInCart.quantity = quantity;
    else throw new Error("Product not found in cart");
    await cart.save();
    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const removeProducts = async (id) => {
  try {
    const cart = await cartModel.findByIdAndUpdate(
      id,
      { items: [] },
      { new: true }
    );
    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const removeProductFromCart = async (id, productId) => {
  try {
    const cart = await cartModel.findById(id);
    cart.items = cart.items.filter(
      (item) => item.product._id.toString() !== productId
    );
    await cart.save();
    return cart;
  } catch (error) {
    console.log(error);
  }
};
