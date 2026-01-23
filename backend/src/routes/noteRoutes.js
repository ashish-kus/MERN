import express from "express";
import {
  getNotes,
  getNoteById,
  postNote,
  putNote,
  deleteNote,
} from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getNotes);

router.get("/:id", getNoteById);

router.post("/", postNote);

router.put("/:id", putNote);

router.delete("/:id", deleteNote);

export default router;
