import express from "express";
import PackageControllers from "../controllers/package.controller.js";

const router = express.Router();
const Packages = new PackageControllers();

router.get("/", Packages.index);
router.post("/", Packages.create);
router.put("/:id", Packages.update);
router.delete("/:id", Packages.destroy);
router.delete("/", Packages.destroyAll);

export default router;
