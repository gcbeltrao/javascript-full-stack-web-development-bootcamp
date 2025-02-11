import express from "express";
import {
  renderHome,
  renderCreatePage,
  createMovie,
  addMovie,
  renderEditPage,
  editMovie,
  deleteMovie,
  importUserMovies,
  deleteAllMovies,
} from "../controllers/moviesController.js";

const router = express.Router();

router.get("/", renderHome);
router.get("/create", renderCreatePage);
router.post("/create", createMovie);
router.get("/create/:id", addMovie);
router.get("/movies/:id", renderEditPage);
router.post("/movies/:id", editMovie);
router.get("/delete/:id", deleteMovie);
router.get("/importUser", importUserMovies);
router.get("/deleteAll", deleteAllMovies);

export default router;
