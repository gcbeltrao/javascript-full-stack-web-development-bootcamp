import express from "express";
import {
  allPosts,
  newPost,
  addPost,
  editPost,
  updatePost,
  deletePost,
  deleteAll,
} from "../controllers/controllers.js";

const router = express.Router();

router.get("/", allPosts);
router.get("/new", newPost);
router.post("/new", addPost);
router.get("/edit/:id", editPost);
router.post("/edit/:id", updatePost);
router.get("/delete/all", deleteAll)
router.get("/delete/:id", deletePost);

export default router;
