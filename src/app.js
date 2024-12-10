import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import "dotenv/config";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Create a write stream (in append mode)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const logDirectory = path.join(__dirname, "../logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// Buat write streams
const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, "access.log"),
  { flags: "a" }
);

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(limiter);

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
