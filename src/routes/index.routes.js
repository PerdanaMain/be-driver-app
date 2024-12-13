import express from "express";
import config from "../config/index.js";
import db from "../config/database.js";

import authRoutes from "./auth.routes.js";
import packageRoutes from "./package.routes.js";

const router = express.Router();
const prefix = config.api.prefix;

router.get(prefix + "/", async (req, res) => {
  res.json({
    status: "success",
    message: "Welcome to the API",
    dbConnection: await db.connect(),
  });
});

router.use(prefix + "/auth", authRoutes);
router.use(prefix + "/packages", packageRoutes);

router.use("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

export default router;
