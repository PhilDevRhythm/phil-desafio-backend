(async () => {
  // OBTNER CART
  const cartResponse = await fetch("/api/carts");
  let [cart] = await cartResponse.json();
  if (!cart) {
    const createCartResponse = await fetch("/api/carts", { method: "POST" });
    cart = await createCartResponse.json();
  }

  // BOTON
  const addToCartButt = document.querySelectorAll("addToCart");
  addToCartButt.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const { productId: productId } = event.target.dataset;

      // AGREGAR PROD
      try {
        const response = await fetch(
          `/api/carts/${cart._id}/product/${productId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        cart = await response.json();
      } catch (error) {
        console.log(error);
      }
    });
  });
});
