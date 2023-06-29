import express from "express";
import ProdManager from "./managers/prodManager.js";

const app = express();

app.use(express.json()); //IMPORTANTE
app.use(express.urlencoded({ extended: true })); //IMPORTANTE

const prodManager = new ProdManager("./products.json");

/* ------------------------------------ - ----------------------------------- */

//GET ALL PRODUCTS

app.get("/products", async (req, res) => {
  //DECLARA ASYNC
  try {
    const { limit } = req.query;
    if (limit) {
      const products = await prodManager.topLimit(limit); //FUNCION PARA LIMITAR RESULTADOS
      res.status(200).json(products);
    } else {s
      const products = await prodManager.getProducts();
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// GET PRODUCT BY ID
app.get("/products/:productId", async (req, res) => {
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

app.get("/search", async (req, res) => {
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
app.post("/products", async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const product = { name, description, price, stock };
    const newProduct = await prodManager.createProduct(product);
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//UPDATE PRODUCT
app.put("/products/:productId", async (req, res) => {
  try {
    const product = req.body;
    const { productId } = req.params;
    const prodNumber = Number(productId);
    const productExist = await prodManager.getProductByID(prodNumber);
    if (productExist) {
      await prodManager.updateProduct(product, prodNumber);
      res.json({ message: `Product ${prodNumber} updated` });
    } else {
      res.status(400).json({ message: `ProductID ${prodNumber} not found` });
    }
  } catch (error) {
    console.log("thiswayS");
    res.status(500).json({ message: error.message}, "thiswayS");
  }
});

// SERVER STATUS
app.listen(8080, () => {
  console.log("server is on 8080");
});
