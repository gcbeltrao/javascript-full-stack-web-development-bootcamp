import "./config.js";
import express from "express";
import moviesRoutes from "./routes/movies.js";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", moviesRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
