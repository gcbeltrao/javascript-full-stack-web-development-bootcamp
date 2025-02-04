import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res)=> {
  return res.render("index.ejs");
});

app.get("/about", (req, res)=> {
  return res.render("about.ejs");
});

app.get("/contact", (req, res)=> {
  return res.render("contact.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
