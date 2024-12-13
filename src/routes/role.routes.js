import express from "express";
import RoleController from "../controllers/role.controllers.js";

const router = express.Router();
const Role = new RoleController();

router.get("/", Role.index);

export default router;
