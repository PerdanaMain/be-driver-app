import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import Logger from "./utils/logger.js";
import indexRoutes from "./routes/index.routes.js";

import "dotenv/config";

const app = express();
const logger = new Logger();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(limiter);

// Logger middleware
app.use(logger.getHttpLoggerMiddleware());
app.use(logger.getFileLoggerMiddleware());

// Routes
app.use("/", indexRoutes);

export default app;
