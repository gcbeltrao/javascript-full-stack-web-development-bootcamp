import "./config.js";
import express from "express";
import routesList from "./routes/routes.js";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", routesList);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
