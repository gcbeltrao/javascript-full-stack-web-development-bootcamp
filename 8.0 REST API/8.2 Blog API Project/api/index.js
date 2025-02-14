import "./config.js";
import express from "express";
import apiRoutes from "./routes/routes.js";

const app = express();
const port = 4000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
