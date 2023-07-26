import { Router } from "express";
import * as controller from "../controllers/productController.js";

const router = Router();

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.erase);

export default router;
