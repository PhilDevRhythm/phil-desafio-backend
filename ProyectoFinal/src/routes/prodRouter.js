import { Router } from "express";
import * as controller from "../controllers/productController.js";

const router = Router();

//GET ALL PRODUCTS
router.get("/", controller.getAll);
// GET PRODUCT BY ID
router.get("/:productId", controller.getById);
// CREATE PRODUCT
router.post("/", controller.create);
//UPDATE PRODUCT
router.put("/:productId", controller.update);
// DELETE PRODUCT
router.delete("/:productId", controller.remove);

export default router;
