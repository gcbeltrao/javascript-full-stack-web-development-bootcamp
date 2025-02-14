import express from "express";
import {
  addPost,
  allPosts,
  deletePost,
  replacePost,
  specificPost,
  deleteAll,
} from "../controllers/controllers.js";

const router = express.Router();

router.get("/", allPosts);
router.get("/posts/:id", specificPost);
router.post("/", addPost);
router.patch("/posts/:id", replacePost);
router.delete("/delete/all", deleteAll);
router.delete("/delete/:id", deletePost);

export default router;
