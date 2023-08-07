import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import { __dirname } from "./utils.js";
import prodRouter from "./routes/prodRouter.js";
import cartRouter from "./routes/cartRouter.js";
import viewsRouter from "./routes/viewsRouter.js";

import morgan from "morgan";
import "./daos/mongodb/connection.js";

const app = express();
// SOCKET.IO

// import { Server } from "socket.io";

// const httpServer = app.listen(8080, () => {
//   console.log(`APP is on ${8080}`);
// });

// app.get("/realtimeproducts", (req, res) => {
//   res.render("realtimeproducts");

//   ;
// });

// HANDLEBARS CONFIGURATION

import handlebars from "express-handlebars";

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// app.use("/", viewsRouter);

//USEFUL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// ERROR HANDLING
app.use(errorHandler);
app.use(morgan("dev"));

//FROM ROUTES
app.use("/api/products", prodRouter);
// app.use("/views", viewsRouter);
app.use("/api/carts", cartRouter);

// app STATUS
app.listen(8080, () => {
  console.log(`app is on 8080`);
});

// SESSION

import session from "express-session";
import validateLogin from "../src/middlewares/validateLogin.js";
import isAdmin from "../src/middlewares/isAdmin.js";

// const sessionConfig = {
//   secret: "secret",
//   cookie: { maxAge: 10000 },
//   saveUninitilized: true,
//   resave: false,
// };

// app.use(session(sessionConfig));

// const users = [
//   { username: "admin", password: 1234, admin: true },
//   { username: "user0", password: 1234, admin: false },
// ];

// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   const index = users.findIndex(
//     (user) => user.username === username && user.password === password
//   );
//   if (index < 0) res.json({ error: "User not found" });
//   else {
//     const user = users[index];
//     req.session.info = {
//       loggedIn: true,
//       count: 1,
//       admin: user.admin,
//     };
//     res.json({ msg: `Bienvenido ${user.username}` });
//   }
// });

// app.get("/dashboard", validateLogin, (req, res) => {
//   req.session.info.count++;
//   res.json({
//     msg: "Bienvenido",
//     session: req.session,
//   });
// });

// app.get("/admin-dashboard", validateLogin, isAdmin, (req, res) => {
//   req.session.info.count++;
//   res.json({
//     msg: "Bienvenido Admin ",
//     session: req.session,
//   });
// });

// app.post("/logout", (req, res) => {
//   req.session.destroy();
//   res.json({ msg: "Session destroyed!" });
// });

// SESSION FILE STORE

import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import userRouter from "./routes/userRouter.js";
import { connectionString } from "./daos/mongodb/connection.js";


// const fileStore = sessionFileStore(session);

const mongoStoreOptions = {
  store: MongoStore.create({
    mongoUrl: connectionString,
    crypto: {
      secret: "1234",
    },
    reapInterval: 30,
  }),
  secret: "1234",
  resave: false,
  saveUninitilized: false,
  cookie: {
    maxAge: 120000,
  },
};

app.use(cookieParser());
app.use(session(mongoStoreOptions));

app.use("/users", userRouter);
app.use("/", viewsRouter);

// SOCKET

// const socketServer = new Server(httpServer);

// socketServer.on("connection", (socket) => {
//   console.log(`Connected id: ${socket.id}`);
//   socket.on("disconnect", () => {
//     console.log(`Disconnecting ${socket.id}`);
//   });
//   socket.emit("connected");
//   socket.on("newProduct", (obj) => {
//     products.push(obj);
//     socketServer.emit("prodList", products);
//   });
// });
