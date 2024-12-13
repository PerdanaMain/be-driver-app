import express from "express";
import ReceiverController from "../controllers/receiver.controller.js";

const router = express.Router();
const Receivers = new ReceiverController();

router.get("/", Receivers.index);

export default router;
