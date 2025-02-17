import express from "express";
import {
  renderHome,
  addCountry,
  changeUser,
  addUser,
} from "../controllers/controller.js";

const router = express.Router();

router.get("/", renderHome);
router.post("/add", addCountry);
router.post("/user", changeUser);
router.post("/new", addUser);

export default router;
