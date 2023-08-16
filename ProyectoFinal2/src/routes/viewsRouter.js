import { Router } from "express";
// import { getProducts } from "../managers/prodManager.js";
import * as productService from "../services/productServices.js";
import * as cartService from "../services/cartServices.js";
const router = Router();

// LOGIN VIEWS

import {
  login,
  register,
  errorLogin,
  errorRegister,
  profile,
  logout,
} from "../controllers/viewsController.js";

router.get("/users/login", login);
router.get("/users/register", register);
router.get("/users/errorLogin", errorLogin);
router.get("/users/errorRegister", errorRegister);
router.get("/users/profile", profile);
router.get("/users/logout", logout);

// PRODUCTS VIEWS

router.get("products" && "/:cartId", async (req, res) => {
  try {
    const { page } = req.query;

    const {
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      hasPrevPage,
      hasNextPage,
      page: currentPage,
    } = await productService.getAllProdWithPages({ page, limit: 1 });

    const flatProducts = products.map((product) => product.toObject());
   
    res.render("products", {
      products: flatProducts,
      totalPages,
      currentPage,
      prevPage,
      nextPage,
      totalPages,
      hasNextPage,
      hasPrevPage,
      prevLink: `/products?page=${prevPage}`,
      nextLink: `/products?page=${nextPage}`,
    });
  } catch (error) {
    res.render("error", { message: "Cart or product not found - viewRouter" });
  }
});

// CART VIEWS

router.get("/:cartId", async (req, res) => {
  try {
    const { cartId } = req.params;

    const cart = await cartService.getById(cartId);
    const flatItems = cart.items.map((item) => ({
      ...item.toObject(),
      totalPrice: item.product.price * item.quantity,
    }));

    res.render("cart", { items: flatItems, cartId: cart._id });
  } catch (error) {
    res.render("error", { message: "Cart not found" });
  }
});

export default router;
