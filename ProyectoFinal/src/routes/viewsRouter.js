import { Router } from "express";
import { getProducts } from "../managers/prodManager.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await getProducts();
    console.log(products);

    res.render("home", { products });
  } catch (error) {}
});

router.get("/", async (req, res) => {
  try {
    const products = await getProducts();
    console.log(products);

    res.render("realtimeproducts", { products });
  } catch (error) {}
});

router.get("/", async (req, res) => {
  try {
    const products = await getProducts();
    console.log(products);

    res.render("products", { products });
  } catch (error) {}
});

export default router;
