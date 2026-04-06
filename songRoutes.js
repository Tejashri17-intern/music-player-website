import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getSongs,
  getPlaylistByTag,
  toggleFavourite,
} from "../controllers/songController.js";

const songrouter = express.Router();

songrouter.get("/", getSongs);
songrouter.get("/playlistByTag/:tag", getPlaylistByTag);
songrouter.post("/favourite", protect, toggleFavourite);
songrouter.get("/favourites", protect, (req, res) => {
  res.json(req.user.favourites);
});

export default songrouter;
