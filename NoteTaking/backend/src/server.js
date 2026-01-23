import express from "express";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ CORS MUST come before routes
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.use("/api/notes", noteRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
