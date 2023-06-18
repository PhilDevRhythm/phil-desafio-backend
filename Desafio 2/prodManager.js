import fs, { accessSync } from "fs";

export default class ProdManager {
  constructor(path) {
    this.path = path;
  }

  async createProduct(name, description, price, stock) {
    try {
      const product = {
        id: (await this.#getMaxID()) + 1,
        name,
        description,
        price,
        stock,
      };
      const prodList = await this.getProducts();
      prodList.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(prodList));
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async #getMaxID() {
    let maxId = 0;
    const products = await this.getProducts();
    products.map((product) => {
      if (product.id > maxId) maxId = product.id;
    });
    return maxId;
  }
  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        const productsJSON = JSON.parse(products);
        return productsJSON;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getProductByID(id) {
    try {
      const prodList = await this.getProducts();
      const products = prodList.find((product) => product.id === id);
      if (products) return console.log(products);
      else return console.log("No product found");
    } catch (error) {
      console.log(error);
    }
  }
  async updateProduct(id, obj) {
    try {
      const prodList = await this.getProducts();
      const index = prodList.findIndex((product) => product.id === id);
      if (index === -1) {
        console.log("id not found");
      } else {
        prodList[index] = { ...obj, id };
      }
      await fs.promises.writeFile(this.path, JSON.stringify(prodList));
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProduct(id) {
    try {
      const prodList = await this.getProducts();
      if (prodList) {
        const newArray = prodList.filter((product) => product.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      } else {
        throw new Error("No product found");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const app = new ProdManager("./products.json");

// TESTING

const execute = async () => {
  try {
    // CREATE PRODUCT
    // const product1 = await app.createProduct(
    //   "Product 1",
    //   "Product 1 description",
    //   1000,
    //   10
    // );
    // CREATE PRODUCT 2
    // const product2 = await app.createProduct(
    //   "Product 2",
    //   "Product 2 description",
    //   4000,
    //   100
    // );
    // UPDATE FOR PRODUCT 1
    // const update1 = await app.updateProduct(
    //   1,{
    //   name: "Product 1 UPDATED",
    //   description: "Product 1 description UPDATED",
    //   price : 1000,
    //   stock: 100000}
    // );
    // GET PRODUCT BY ID EXIST
    const productByID1 = await app.getProductByID(10);
    // GET PRODUCT BY ID DOESNT EXIST
    const productByID2 = await app.getProductByID(1);
    // DELETE PRODUCT
    // const productDelete1 = await app.deleteProduct(2);
  } catch (error) {
    console.log(error);
  }
};

execute();
