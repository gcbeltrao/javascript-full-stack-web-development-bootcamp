import "./config.js";
import express from "express";
import booksRoutes from "./routes/books.js";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", booksRoutes);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
