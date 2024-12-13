import jwt from "jsonwebtoken";
import Config from "../config/index.js";

class VerifyToken {
  async verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token)
      return res.status(401).json({ status: false, message: "Forbidden" });

    try {
      const verified = jwt.verify(token, Config.jwtSecret);
      req.user = verified;
      next();
    } catch (error) {
      return res.status(400).json({ status: false, message: "Invalid Token" });
    }
  }
}

export default VerifyToken;
