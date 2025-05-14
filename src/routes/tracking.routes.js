import express from "express";
import TrackingController from "../controllers/tracking.controller.js";
import validateRequest from "../middlewares/validateRequest.middleware.js";
import { trackingPost } from "../utils/schema.js";
import VerifyToken from "../middlewares/verifyToken.middlewares.js";    

const router = express.Router();
const trackingController = new TrackingController();

// router.get("/", Auth.verifyToken, trackingController.index);
router.get("/", trackingController.index);
router.get("/:id/package", trackingController.showByPackageId);
router.post("/", validateRequest(trackingPost), trackingController.create);
// router.put("/:id", trackingController.update);
// router.delete("/:id", trackingController.destroy);

export default router;






















