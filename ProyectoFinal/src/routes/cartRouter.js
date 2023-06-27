import { Router } from "express";
import CartManager from "../managers/cartManager.js";
const router = Router();

const cart = [];

const cartManager = new CartManager("./cart.json");

router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    if (limit) {
      const cartGroup = await cartManager.topLimit(limit); //FUNCION PARA LIMITAR RESULTADOS
      res.status(200).json(cartGroup);
    } else {
      const cartGroup = await cartManager.getCart();
      res.status(200).json(cartGroup);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE CART
router.post("/", (req, res) => {
  const cartItem = req.body;
  cart.push(cartItem);
  res.status(200).json(cartItem);
});

router.post("/:idCart/product/:idProduct", (req, res) => {
  const idCart = req.params.idCart;
  const idProduct = req.params.idProduct;
});

export default router;
