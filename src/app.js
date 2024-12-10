import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import logger from "./config/logger.js";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import "dotenv/config";

const app = express();

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

app.get("/", (req, res) => {
  res.json(
    {
      message: "Hello World",
      status: true,
    },
    200
  );
});

export default app;
