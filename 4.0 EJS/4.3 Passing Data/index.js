import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  let nameLength = req.body.fName.length + req.body.lName.length;
  return res.render("index.ejs", {nameLength: nameLength})
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
