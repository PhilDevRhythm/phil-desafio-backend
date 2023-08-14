import { Router } from "express";
import { loginUser, registerUser } from "../../../ProyectoFinal/src/controllers/userController.js";
import passport from "passport";
import {isAuth} from "../../../ProyectoFinal/src/utils.js"


const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// RUTA LOCAL
router.post("/register", passport.authenticate("register"), registerResponse);
router.post("/login", passport.authenticate("login"), loginResponse)
router.get("/private", isAuth, (req, res) => res.send("route private"));


// RUTA PASSPORT-GITHUB
router.get("/register-github", passport.authenticate("github", {scope:["user:email"]}));
router.get("/profile-github", passport.authenticate("github", {scope:["user:email"]}), (req, res) => res.send("profile hithub"));



// SESSION LOGIN

// import {
//   login,
//   logout,
//   visit,
//   infoSession,
// } from "../controllers/userController.js";
// import validateLogin from "../middlewares/validateLogin.js";

// router.post("/login", login);
// router.get("/info", validateLogin, infoSession);
// router.get("/admin-dashboard", validateLogin, visit);
// router.post("/logout", logout);

export default router;
