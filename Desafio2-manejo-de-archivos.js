// CLASE CONSTRUCTORA
class ProductManager {
    constructor() {
      this.products = [];
    }
    // Funcion para agregar producto con ID automatica
    addProduct(title, description, price, thumbnail, code, stock) {
      const product = {
        id: this.#getMaxId() + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        aux: [],
      };
      if (this.products.includes(product.title)) {
        console.log("El producto ya esta en la lista");
      } else {
        this.products.push(product);
      }
    }
    // FUNCION PARA ID AUTOMATICO
    #getMaxId() {
      let maxID = 0;
      this.products.map((product) => {
        if (product.id > maxID) maxID = product.id;
      });
      return maxID;
    }
  // FUNCION OBTENER PRODUCTOS
    getProducts() {
      return this.products;
    }
  // FUNCION PARA SELECCIONAR POR ID y MSJE SI NO ENCUENTRA
    getProductsbyID(id) {
      const idtempList = [];
      const msgNotFound = `There's no product with ${id} ID`;
      const idtempOps = this.products.find((product) => product.id === id);
      idtempList.push(idtempOps);
  
      if (idtempOps) {
        return idtempList;
      } else {
        return msgNotFound;
      }
    }
    return;
  }
  
  const add = new ProductManager();
  
  // TESTING
  
  console.log("Get Products at beginning -->", add.getProducts());
  
  add.addProduct("Pepsi", "best soda ever", 1000, "SIN IMAGEN", "abc123", 25);
  add.addProduct("Tomato 1KG", "cheap", 800, "SIN IMAGEN", "abc1234", 50);
  add.addProduct("Gum2", "no sugar", 2000, "SIN IMAGEN", "abc12345", 80);
  
  // METODO GET PRODUCTS - TODOS
  console.log(
    "METODO GetProducts - Get Products after addition -->",
    add.getProducts()
  );
  
  // METODO GET PRODUCTS - TEST POSITIVO + ITEM
  console.log(
    "METODO GetProductsByID - Get Products by ID --> Using ID 2 ",
    add.getProductsbyID(2)
  );
  
  // METODO GET PRODUCTS - TEST NEGATIVO + MSJE
  console.log(
    "METODO GetProductsByID - Get Products by ID --> Using ID 4 (error) ",
    add.getProductsbyID(4)
  );
  