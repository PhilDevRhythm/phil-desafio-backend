import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import { __dirname } from "./utils.js";
import prodRouter from "./routes/prodRouter.js";
import cartRouter from "./routes/cartRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
import morgan from 'morgan';

const app = express();
const products = []
// SOCKET.IO

import { Server } from "socket.io";

const httpServer = app.listen(8080, () => {
  console.log(`APP is on ${8080}`);
});

app.get("/realtimeproducts", (req, res) => {
  res.render("realtimeproducts");

  ;
});
// HANDLEBARS CONFIGURATION

import handlebars from "express-handlebars";

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter);

//USEFUL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// ERROR HANDLING
app.use(errorHandler)
app.use(morgan('dev'));

//FROM ROUTES
app.use("/api/products", prodRouter);
app.use("/api/carts", cartRouter);

// // app STATUS
// app.listen(PORT, () => {
//   console.log(`app is on ${8080}`);
// });

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log(`Connected id: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`Disconnecting ${socket.id}`);
  });
  socket.emit("connected");
  socket.on("newProduct", (obj) => {
    products.push(obj);
    socketServer.emit("prodList", products);
  });
});
