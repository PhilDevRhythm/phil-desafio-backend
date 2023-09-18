import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import { __dirname } from "./utils.js";
import prodRouter from "./routes/prodRouter.js";
import cartRouter from "./routes/cartRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
import MainRouter from "./routes/index.js";

const mainRouter = new MainRouter();

import { userModel } from "./daos/mongodb/models/userModel.js";

import "dotenv/config";

import session from "express-session";
import validateLogin from "./middlewares/validateLogin.js";
import isAdmin from "./middlewares/isAdmin.js";

import morgan from "morgan";
import "./daos/mongodb/connection.js";

// PASSPORT
import passport from "passport";
import "./passport/github-strategy.js";

// HANDLEBARS CONFIGURATION

import handlebars from "express-handlebars";


const mongoStoreOptions = {
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_LOCAL_URL,
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

const app = express();

app
  .engine("handlebars", handlebars.engine())
  .set("views", __dirname + "/views")
  .set("view engine", "handlebars")

  // app.use("/", viewsRouter);

  //USEFUL

  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static(__dirname + "/public"))

  // ERROR HANDLING
  .use(errorHandler)
  .use(morgan("dev"))

  //FROM ROUTES
  // .use("/api/products", prodRouter)
  // // app.use("/views", viewsRouter);
  // .use("/api/carts", cartRouter)
  .use("/api", mainRouter.getRouter())

  // app STATUS
  .listen(process.env.PORT, () => {
    console.log(`app is on ${process.env.PORT}`)
  })

  app.post("/users/alt-login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const users = await userModel.findOne({ email });
      const index = users.findIndex(
        (user) => user.username === email && user.password === password
      );
      if (index < 0) res.json({ error: "User not found" })
      else {
        const user = users[index];
        req.session.info = {
          loggedIn: true,
          count: 1,
          admin: user.admin,
        };
        res.json({ msg: `Bienvenido ${user.username}` })
      }
    } catch {}
  })

  
    .use(cookieParser())
    .use(session(mongoStoreOptions))
    
    .use("/", viewsRouter)


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

app.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ msg: "Session destroyed!" });
});

// SESSION FILE STORE

import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import userRouter from "./routes/userRouter.js";
// import { connectionString } from "./daos/mongodb/connection.js";

// const fileStore = sessionFileStore(session);


// SESSION

const sessionConfig = {
  secret: "secret",
  cookie: { maxAge: 10000 },
  saveUninitilized: true,
  resave: false,
};

app.use(session(sessionConfig));

// const users = [
//   { username: "admin", password: 1234, admin: true },
//   { username: "user0", password: 1234, admin: false },
// ];

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

// SOCKET.IO

// import { Server } from "socket.io";

// const httpServer = app.listen(8080, () => {
//   console.log(`APP is on ${8080}`);
// });

// app.get("/realtimeproducts", (req, res) => {
//   res.render("realtimeproducts");

//   ;
// });

// USAR PASSPORT SESSION ABAJO CON SESSION ACTIVO
app.use(passport.session());
app.use(passport.initialize());
