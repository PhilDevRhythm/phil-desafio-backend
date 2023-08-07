import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

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
