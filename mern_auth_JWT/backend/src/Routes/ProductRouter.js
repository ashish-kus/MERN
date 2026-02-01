import express from "express";
import { ensureAuthenticated } from "../Middlewares/Auth.js";

const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
  console.log(req.user);
  res.status(200).json([
    {
      name: "Product 1",
      price: 1000000,
    },
    {
      name: "Product 2",
      price: 2000000,
    },
  ]);
});

export default router;
