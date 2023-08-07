// CONEXION A WEBSOCKET
// const socketClient = io();

// // CONEXION AL DOM
// const form = document.getElementById("form");
// const inputName = document.getElementById("name");
// const inputPrice = document.getElementById("price");
// const inputStock = document.getElementById("stock");
// const products = document.getElementById("products");

// FUNCIONES PARA CAPTURAR DATA

// form.onsubmit = (e) => {
//   e.preventDefault();
//   const name = inputName.value;
//   const price = inputPrice.value;
//   const stock = inputStock.value;
//   socketClient.emit("newProduct", { name, price, stock });
// };

// IMPRIMIR MEDIANTE WEBSOCKET

// socketClient.on("prodList", async (prods) => {
//   let productData = "";
//   prods.forEach((product) => {
//     productData += `${product.name} - ${product.price} - ${product.stock} </br>`;
//   });
//   products.innerHTML = productData;
// });

const addtoCart = async () => {
  // OBTNER CART
  const cartFetch = await fetch("/api/carts", { method: "GET" });
  let [cart] = await cartFetch.json();
  if (!cart) {
    const createCartResponse = await fetch("/api/carts", { method: "POST" });
    cart = await createCartResponse.json();
  }

  // BOTON
  const addToCartButt = document.getElementById("addToCart");

  addToCartButt.onclick = () => {
    console.log("Add to cart issue");
    // addToCartButt.forEach((button) => {
    //   button.addEventListener("click", async (event) => {
    //     const { id: productId } = event.target.dataset;

    // AGREGAR PROD

    const response = fetch(`/api/carts/${cart._id}/product/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    cart = response.json();
  };
};
