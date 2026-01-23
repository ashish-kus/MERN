import Note from "../models/Note.js";

export async function getNotes(req, res) {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error While getting the notes", error);
    res.status(500).json({ message: "internal Server Error" });
  }
}

export async function postNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title: title, content: content });
    await newNote.save();
    res.status(201).json({ message: "new note created" });
  } catch (error) {
    console.error("Error while creating note", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function putNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true },
    );

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error while creating note", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deleteNote)
      return res.status(404).json({ message: "note to delete not found;" });
    res.status(200).json({ message: "note deleted successfully!" });
  } catch (error) {
    console.error("Error while deleting note", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note)
      return res.status(404).json({ message: "Note with that id not found." });
    res.status(200).json(note);
  } catch (error) {
    console.error("Error while deleting note", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
