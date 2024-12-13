import express from "express";

import SenderController from "../controllers/sender.controllers.js";

const router = express.Router();
const Sender = new SenderController();

router.get("/", Sender.index);
router.get("/:id", Sender.show);

export default router;
