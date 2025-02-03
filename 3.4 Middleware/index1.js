import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res)=> {
  console.log(req.body);
  res.send("<h1>Formulario enviado!</h1>")
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
