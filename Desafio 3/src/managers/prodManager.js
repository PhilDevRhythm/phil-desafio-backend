import fs, { accessSync } from "fs";

export default class ProdManager {
  constructor(path) {
    this.path = path;
  }

  async createProduct(obj) {
    try {
      const product = {
        id: (await this.#getMaxID()) + 1,
        ...obj,
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
        const products = await fs.readFileSync(this.path);
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
      if (products) return products;
      else return false;
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
      if (prodList.lengh > 0) {
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

