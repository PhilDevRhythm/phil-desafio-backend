import { Router } from "express";
import ProdManager from "../managers/prodManager.js";

const router = Router();
const prodManager = new ProdManager("./products.json");

//GET ALL PRODUCTS

router.get("/", async (req, res) => {
  //DECLARA ASYNC
  try {
    const { limit } = req.query;
    if (limit) {
      const products = await prodManager.topLimit(limit); //FUNCION PARA LIMITAR RESULTADOS
      res.status(200).json(products);
    } else {
      const products = await prodManager.getProducts();
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// GET PRODUCT BY ID
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await prodManager.getProductByID(Number(productId));
    if (product) {
      res.json(product);
    } else {
      res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/search", async (req, res) => {
  try {
    const { id } = req.query;
    const product = await prodManager.getProductByID(Number(id));
    if (product) {
      res.json(product);
    } else {
      res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE PRODUCT
router.post("/", async (req, res) => {
  try {
    const { name, description, code, price, status, stock, category, thumbnails } =
      req.body;
    const product = {
      name,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnails,
    };
    const newProduct = await prodManager.createProduct(product);
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//UPDATE PRODUCT
router.put("/:productId", async (req, res) => {
  try {
    const product = req.body;
    const { productId } = req.params;
    const prodNumber = Number(productId);
    const productExist = await prodManager.getProductByID(prodNumber);
    if (productExist) {
      await prodManager.updateProduct(prodNumber, product);
      res.json({ message: `Product ${prodNumber} updated` });
    } else {
      res.status(400).json({ message: `ProductID ${prodNumber} not found` });
    }
  } catch (error) {
    console.log("thiswayS");
    res.status(500).json({ message: error.message }, "thiswayS");
  }
});

router.delete("/:productId", async (req, res) => {
  try {
    const product = req.body;
    const { productId } = req.params;
    const prodNumber = Number(productId);
    const productExist = await prodManager.getProductByID(prodNumber);
    if (productExist) {
      await prodManager.deleteProduct(prodNumber);
      res.json({ message: `Product ${prodNumber} has beeen removed` });
    } else {
      res.status(400).json({ message: `ProductID ${prodNumber} not found` });
    }
  } catch (error) {}
});

export default router;
