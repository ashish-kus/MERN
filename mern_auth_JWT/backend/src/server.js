import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/connectDB.js";
import AuthRouter from "./Routes/AuthRouter.js";
import ProductRouter from "./Routes/ProductRouter.js";

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use("/auth", AuthRouter);

// Product route
app.use("/products", ProductRouter);

app.get("/", (req, res) => {
  res.send({ message: "ping is working" });
});

app.listen(PORT, () => {
  console.info(`Server is running on ${PORT}`);
});
