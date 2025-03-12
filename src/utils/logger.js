import morgan from "morgan";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

class Logger {
  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }

    // get directory name
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const logDirectory = path.join(__dirname, "../../logs");
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }

    this.accessLogStream = fs.createWriteStream(
      path.join(logDirectory, "access.log"),
      { flags: "a" }
    );

    this.errorLogStream = fs.createWriteStream(
      path.join(logDirectory, "error.log"),
      { flags: "a" }
    );

    // Custom morgan token untuk timestamp yang lebih detail
    morgan.token("timestamp", () => {
      return new Date().toISOString();
    });

    // Custom morgan token untuk request body
    morgan.token("body", (req) => {
      return JSON.stringify(req.body);
    });

    // Format untuk development
    this.developmentFormat = morgan((tokens, req, res) => {
      return [
        `\x1b[36m${tokens.timestamp(req, res)}\x1b[0m`, // Cyan timestamp
        `\x1b[33m${tokens.method(req, res)}\x1b[0m`, // Yellow method
        `\x1b[36m${tokens.url(req, res)}\x1b[0m`, // Cyan URL
        `\x1b[35m${tokens.status(req, res)}\x1b[0m`, // Magenta status
        `\x1b[36m${tokens["response-time"](req, res)}ms\x1b[0m`, // Cyan response time
      ].join(" ");
    });

    // Format untuk production
    this.productionFormat = morgan(
      [
        ":timestamp",
        ":remote-addr",
        ":method",
        ":url",
        "HTTP/:http-version",
        ":status",
        ":res[content-length]",
        ":response-time ms",
        ":body",
      ].join(" ")
    );

    Logger.instance = this;
  }

  // Get middleware berdasarkan environment
  getHttpLoggerMiddleware() {
    if (process.env.NODE_ENV === "production") {
      return this.productionFormat;
    }
    return this.developmentFormat;
  }

  // Middleware untuk menulis log ke file
  getFileLoggerMiddleware() {
    return morgan(
      [
        ":timestamp",
        ":remote-addr",
        ":method",
        ":url",
        ":status",
        ":res[content-length]",
        ":response-time ms",
        ":body",
      ].join(" "),
      { stream: this.accessLogStream }
    );
  }

  // Middleware untuk error logging
  errorLogger(err, req, res, next) {
    const errorLog = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      error: {
        message: err.message,
        stack: err.stack,
      },
      requestBody: req.body,
      requestParams: req.params,
      requestQuery: req.query,
    };

    this.errorLogStream.write(JSON.stringify(errorLog) + "\n");
    next(err);
  }
}

export default Logger;
