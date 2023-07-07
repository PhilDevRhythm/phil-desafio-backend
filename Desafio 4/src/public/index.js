// CONEXION A WEBSOCKET

const socketClient = io();

// CONEXION AL DOM
const form = document.getElementById("form");
const inputName = document.getElementById("name");
const inputPrice = document.getElementById("price");
const inputStock = document.getElementById("stock");
const products = document.getElementById("products");

// FUNCIONES PARA CAPTURAR DATA

form.onsubmit = (e) => {
  e.preventDefault();
  const name = inputName.value;
  const price = inputPrice.value;
  const stock = inputStock.value;
  socketClient.emit("newProduct", { name, price, stock });
};

// IMPRIMIR MEDIANTE WEBSOCKET

socketClient.on("prodList", async (prods) => {
  let productData = "";
  prods.forEach((product) => {
    productData += `${product.name} - ${product.price} - ${product.stock} </br>`;
  });
  products.innerHTML = productData;
});
