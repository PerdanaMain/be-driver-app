import express from "express";
import OrderController from "../controllers/order.controller.js";
import validateRequest from "../middlewares/validateRequest.middleware.js";
import { orderPost, orderPut } from "../utils/schema.js";

const router = express.Router();
const orderController = new OrderController();

router.get("/", orderController.index);
router.get("/:id", orderController.show);
router.post("/", validateRequest(orderPost), orderController.create);
router.put("/:id", validateRequest(orderPut), orderController.update);
router.delete("/:id", orderController.destroy);

export default router;
