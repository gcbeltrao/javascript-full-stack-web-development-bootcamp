import express from "express";
import postRoutes from "./routes/routes.js";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", postRoutes);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
