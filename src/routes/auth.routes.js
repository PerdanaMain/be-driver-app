import express from "express";
import AuthControllers from "../controllers/auth.controllers.js";

const router = express.Router();
const Auth = new AuthControllers();

router.post("/register", Auth.register);
router.post("/login", Auth.login);
router.delete("/logout", Auth.logout);

export default router;
