import express from "express";
import config from "../utils/index.js";
import db from "../utils/database.js";

import authRoutes from "./auth.routes.js";
import packageRoutes from "./package.routes.js";
import receiverRoutes from "./receivers.routes.js";
import senderRoutes from "./sender.routes.js";
import roleRoutes from "./role.routes.js";
import driverRoutes from "./driver.routes.js";
import orderRoutes from "./order.routes.js";
import trackingRoutes from "./tracking.routes.js";

import VerifyToken from "../middlewares/verifyToken.middlewares.js";

const router = express.Router();
const Auth = new VerifyToken();
const prefix = config.api.prefix;

router.get("/", async (req, res) => {
  res.json({
    status: true,
    message: "Welcome to the API",
    dbConnection: await db.connect(),
  });
});

router.get(prefix + "/", async (req, res) => {
  res.json({
    status: "success",
    message: "Welcome to the API version 1",
    dbConnection: await db.connect(),
  });
});

router.use(prefix + "/auth", authRoutes);
router.use(prefix + "/roles", roleRoutes);
router.use(prefix + "/packages", packageRoutes);
router.use(prefix + "/drivers", driverRoutes);
router.use(prefix + "/orders", orderRoutes);
router.use(prefix + "/tracking", trackingRoutes);

// unused routes
router.use(prefix + "/receivers", receiverRoutes);
// unused routes
router.use(prefix + "/senders", senderRoutes);

router.use("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

export default router;
