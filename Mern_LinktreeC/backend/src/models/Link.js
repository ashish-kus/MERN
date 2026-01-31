import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectID,
  title: String,
  url: String,
  clicks: { type: Number, default: 0 },
});

export default mongoose.model("Link", linkSchema);
