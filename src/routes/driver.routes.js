import express from "express";
import DriverControllers from "../controllers/driver.controller.js";
import validateRequest from "../middlewares/validateRequest.middleware.js";
import { driverPost, driverPut } from "../utils/schema.js";

const router = express.Router();
const Drivers = new DriverControllers();

router.get("/", Drivers.index);
router.get("/:id", Drivers.show);
router.post("/", validateRequest(driverPost), Drivers.create);
router.put("/:id", validateRequest(driverPut), Drivers.update);
// router.delete("/:id", Drivers.destroy);

export default router;
