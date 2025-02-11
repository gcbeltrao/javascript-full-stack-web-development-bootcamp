import express from "express";
import { posts } from "./posts.js";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.render("index.ejs", { posts });
});

app.get("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((post) => post.id == postId);

  if (post) {
    return res.render("post.ejs", { post });
  }
  return res.status(404).send("Post não encontrado");
});

app.get("/posts/:id/edit", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((post) => post.id == postId);

  if (post) {
    return res.render("make-post.ejs", { post });
  }
  return res.status(404).send("Post não encontrado");
});

app.post("/posts/:id/edit", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((post) => post.id == postId);
  if (post) {
    post.title = req.body.title;
    post.subtitle = req.body.subtitle;
    post.content = req.body.content;
    post.author = req.body.author;
    post.date = req.body.date;
    post.img_url = req.body.img_url;
    return res.redirect(`/posts/${post.id}`);
  }
  return res.status(404).send("Post não encontrado");
});

app.get("/about", (req, res) => {
  return res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  return res.render("contact.ejs");
});

app.post("/contact", (req, res) => {
  const messageSent = true;
  return res.render("contact.ejs", { messageSent });
});

app.get("/delete/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((post) => post.id == postId);

  if (post) {
    posts.splice(posts.indexOf(post), 1);
    return res.redirect("/");
  }
  return res.status(404).send("Post não encontrado");
});

app.get("/create", (req, res) => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const formatedDate = `${year}-${month}-${day}`;

  return res.render("make-post.ejs", { formatedDate });
});

app.post("/create", (req, res) => {
  const lastPost = posts.slice(-1);
  const lastId = lastPost[0].id + 1;
  const newPost = {
    id: lastId,
    title: req.body.title,
    subtitle: req.body.subtitle,
    content: req.body.subtitle,
    author: req.body.author,
    date: req.body.date,
    img_url: req.body.img_url,
  };
  posts.push(newPost);
  console.log(lastPost, posts);
  return res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
