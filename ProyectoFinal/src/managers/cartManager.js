import fs, { accessSync } from "fs";

export default class cartManager {
  constructor(path) {
    this.path = path;
  }
  async #getMaxCartID() {
    let maxCartId = 0;
    const cartGroup = await this.getCart();
    cartGroup.map((cart) => {
      if (cart.id > maxCartId) maxCartId = cart.id;
    });
    return maxId;
  }

  async getCart() {
    try {
      if (fs.existsSync(this.path)) {
        const cartGroup = await fs.readFileSync(this.path);
        const cartGroupJSON = JSON.parse(cartGroup);
        return cartGroupJSON;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  async createCart(array) {
    try {
      const cart = {
        id: (await this.#getMaxCartID()) + 1,
        items : array
      };
      const prodList = await this.getProducts();
      prodList.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(prodList));
      return product;
    } catch (error) {
      console.log(error);
    }
  }
}
