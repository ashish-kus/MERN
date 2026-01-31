import express from "express";
import { getProfile } from "../controller/profile.controller.js";

const router = express.Router();

// public route
router.get("/:username", getProfile);

export default router;
