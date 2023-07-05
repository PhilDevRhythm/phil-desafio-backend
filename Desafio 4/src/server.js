import express from "express";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";

import { __dirname } from "./utils.js";

import prodRouter from "./routes/prodRouter.js";
import cartRouter from "./routes/cartRouter.js";
import viewsRouter from "./routes/viewsRouter.js";

const app = express();

// HANDLEBARS CONFIGURATION

import handlebars from "express-handlebars";

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/home", viewsRouter);

//USEFUL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ERROR HANDLING
app.use(errorHandler);

//FROM ROUTES
app.use("/api/products", prodRouter);
app.use("/api/carts", cartRouter);

const PORT = 8080;

// app STATUS
app.listen(PORT, () => {
  console.log(`app is on ${8080}`);
});
