import express from "express";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";

import prodRouter from "./routes/prodRouter.js";
import cartRouter from "./routes/cartRouter.js";

const app = express();

//USEFUL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ERROR HANDLING
app.use(errorHandler)

//FROM ROUTES
app.use("/api/products", prodRouter);
app.use("/api/cart", cartRouter);
app.use("/", prodRouter);

const PORT = 8080

// app STATUS
app.listen(8080, () => {
  console.log("app is on 8080");
});
