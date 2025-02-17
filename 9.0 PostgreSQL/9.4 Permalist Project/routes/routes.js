import express from "express";
import {
  renderHome,
  addPost,
  editPost,
  deletePost,
} from "../controllers/controllers.js";

const router = express.Router();

router.get("/", renderHome);
router.post("/add", addPost);
router.post("/edit", editPost);
router.post("/delete", deletePost);

export default router;
