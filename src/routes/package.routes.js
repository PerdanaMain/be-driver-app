import express from "express";
import PackageControllers from "../controllers/package.controller.js";
import validateRequest from "../middlewares/validateRequest.middleware.js";
import { packagePost, packagePut } from "../utils/schema.js";

const router = express.Router();
const Packages = new PackageControllers();

router.get("/", Packages.index);
router.post("/", validateRequest(packagePost), Packages.create);
router.put("/:id", validateRequest(packagePut), Packages.update);
router.delete("/:id", Packages.destroy);

export default router;
