import express from "express";
import PackageControllers from "../controllers/package.controller.js";

const router = express.Router();
const Packages = new PackageControllers();

router.get("/", Packages.index);

export default router;
