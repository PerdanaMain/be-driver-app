import express from "express";
import PackageControllers from "../controllers/package.controller.js";
import VerifyToken from "../middlewares/verifyToken.middlewares.js";

const router = express.Router();
const Packages = new PackageControllers();
const Auth = new VerifyToken();

router.get("/", Auth.verifyToken, Packages.index);

export default router;
