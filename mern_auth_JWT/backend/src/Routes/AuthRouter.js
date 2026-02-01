import express from "express";
import {
  signupValidation,
  loginValidation,
} from "../Middlewares/AuthValidation.js";

import { Login, Signup } from "../Controller/AuthController.js";

const router = express.Router();

router.post("/signup", signupValidation, Signup);
router.post("/login", loginValidation, Login);

export default router;
