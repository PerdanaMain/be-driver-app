import express from "express";
import DriverControllers from "../controllers/driver.controller.js";
import validateRequest from "../middlewares/validateRequest.middleware.js";
import { driverPost } from "../config/schema.js";

const router = express.Router();
const Drivers = new DriverControllers();

router.get("/", Drivers.index);
router.post("/", validateRequest(driverPost), Drivers.create);
// router.put("/:id", Drivers.update);
// router.delete("/:id", Drivers.destroy);

export default router;
