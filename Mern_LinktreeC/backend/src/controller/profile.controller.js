// backend/src/controllers/profile.controller.js
import User from "../models/User.js";
import Link from "../models/Link.js";

export const getProfile = async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  const links = await Link.find({ userId: user._id });
  res.json({ user, links });
};
