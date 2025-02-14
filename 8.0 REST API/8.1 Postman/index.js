import "./config.js";
import express from "express";
import jokesRoutes from "./routes/routes.js";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use("/", jokesRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
