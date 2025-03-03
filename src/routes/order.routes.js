import express from "express";
import OrderController from "../controllers/order.controller.js";
import validateRequest from "../middlewares/validateRequest.middleware.js";
import { orderPost } from "../config/schema.js";

const router = express.Router();
const orderController = new OrderController();

router.get("/", orderController.index);
router.post("/", validateRequest(orderPost), orderController.create);

export default router;
