import express from "express";
import config from "../config/index.js";
import db from "../config/database.js";

import authRoutes from "./auth.routes.js";
import packageRoutes from "./package.routes.js";
import receiverRoutes from "./receivers.routes.js";

import VerifyToken from "../middlewares/verifyToken.middlewares.js";

const router = express.Router();
const Auth = new VerifyToken();
const prefix = config.api.prefix;

router.get(prefix + "/", async (req, res) => {
  res.json({
    status: "success",
    message: "Welcome to the API",
    dbConnection: await db.connect(),
  });
});

router.use(prefix + "/auth", authRoutes);
router.use(prefix + "/packages", Auth.verifyToken, packageRoutes);
router.use(prefix + "/receivers", Auth.verifyToken, receiverRoutes);

router.use("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

export default router;
