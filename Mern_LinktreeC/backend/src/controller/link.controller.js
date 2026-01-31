// backend/src/controllers/link.controller.js
import Link from "../models/Link.js";

export const createLink = async (req, res) => {
  const link = await Link.create({
    userId: req.user.id,
    title: req.body.title,
    url: req.body.url,
  });
  res.json(link);
};

export const getMyLinks = async (req, res) => {
  const links = await Link.find({ userId: req.user.id });
  res.json(links);
};
