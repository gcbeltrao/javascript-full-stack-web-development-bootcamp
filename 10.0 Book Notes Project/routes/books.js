import express from "express";
import {
  renderHome,
  addBook,
  createBook,
  editBook,
  updateBook,
  deleteBook,
} from "../controllers/controllers.js";

const router = express.Router();

router.get("/", renderHome);
router.get("/add", addBook);
router.post("/add", createBook);
router.get("/books/:id", editBook);
router.post("/books/:id", updateBook);
router.get("/delete/:id", deleteBook);

export default router;
