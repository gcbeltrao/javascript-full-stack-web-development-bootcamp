import express from "express";
import {
  allJokes,
  randomJoke,
  specificJoke,
  filterJoke,
  newJoke,
  replaceJoke,
  editJoke,
  deleteJoke,
  deleteAll
} from "../controllers/controller.js";

const router = express.Router();

router.get("/", allJokes);
router.get("/random", randomJoke);
router.get("/filter", filterJoke);
router.get("/jokes/:id", specificJoke);
router.post("/jokes", newJoke);
router.put("/jokes/:id", replaceJoke);
router.patch("/jokes/:id", editJoke);
router.delete("/jokes/all", deleteAll);
router.delete("/jokes/:id", deleteJoke);

export default router;