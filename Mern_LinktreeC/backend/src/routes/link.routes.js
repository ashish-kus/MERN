import express from "express";
import { createLink, getMyLinks } from "../controller/link.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/", auth, createLink);
router.get("/", auth, getMyLinks);
export default router;
