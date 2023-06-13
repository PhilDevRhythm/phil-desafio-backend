const fs = require("fs");

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./products.json";
  }

  #newId = 1;

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const postData = JSON.parse(data);
        this.products.splice(0, this.products.length);
        this.products.push(postData);
        return this.products, console.log("JSON file found");
      } else {
        return this.products, console.log("JSON file NOT found");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getProductsById(id) {
    try {
      await this.getProducts();
      let prodList = this.products;
      console.log(prodList)

      let productById = prodList.find((element) => {
        return element.id === id;
      });
      if (productById) {
        return productById;
      } else {
        console.log("No existe el ID:" + id);
        return productById;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      // await this.getProducts();

      let allFields =
        !!title && !!description && !!price && !!thumbnail && !!code && !!stock;

      if (!allFields) {
        console.log("Please complete all fields"); //WORKING
        return;
      }
      let repeatedCode = this.products.some((element) => {
        return element.code === code;
      });

      console.log("prod code:" + code);
      if (repeatedCode === code) {
        console.log("Product already exists");
        return;
      }

      if (allFields) {
        const product = {
          id: this.#newId,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };
        this.products.push(product);
        this.#newId++;
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        console.log("Product written to DB successfully");
      }
    } catch (err) {
      console.log(err);
    }
    console.log(this.products);
  }

  async writeProducts(prodList) {
    try {
      const data = JSON.stringify(prodList);
      await fs.promises.writeFile(this.path, data);
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, updateInfo) {
    try {
      await this.getProducts();
      let index = this.products.findIndex((element) => {
        return element.id === id;
      });
      if (updateInfo.code) {
        let codeExists = false;
        codeExists = this.products.some(
          (item) => item.code === updateInfo.code
        );
        if (!codeExists) {
          let modifiedProducts = {
            ...this.products[index],
            ...updateInfo,
          };
          this.products[index] = modifiedProducts;
          this.writeProducts(this.products);
        } else {
          console.log("Product already exists");
          return;
        }
      } else {
        let modifiedProducts = {
          ...this.products[index],
          ...updateInfo,
        };
        this.products[index] = modifiedProducts;
        this.writeProducts(this.products);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      await this.getProducts();

      if (this.products.some((element) => element.id === id)) {
        let index = this.products.findIndex((element) => {
          return element.id === id;
        });
        console.log(index);

        this.products.splice(index, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        return;
      } else {
        console.log("Product not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const manager = new ProductManager();

const execute = async () => {
  // await manager.addProduct("pepsi", "bebida", 1000, "ANY", "ab120", 20);
  // await manager.addProduct("7UP", "bebida", 900, "ANY", "ab100", 30); //TEST addProduct1
  // await manager.addProduct("Pepsi", "bebida", 1000, "ANY", "ab101", 30); //TEST addProduct2
  // await manager.addProduct("Crush", "bebida", 1100, "ANY", "ab102", 30); //TEST addProduct3
  // await manager.getProductsById(2); //TEST GetProductsbyID  "WORKING"
  // await manager.updateProduct(1, {
  //   title: "7UP",
  //   description: "lata",
  //   price: 1000,
  //   thumbnail: "ANY",
  //   code: "ab120",
  //   stock: 30,
  // }); //TEST updateProduct
  // await manager.addProduct("7UP"); //TEST "AllFields"
  await manager.getProducts()
  // await manager.deleteProduct(1); //TEST delete
  console.log("code execution ended"); //FINAL DE ARCHIVO
};

execute();
