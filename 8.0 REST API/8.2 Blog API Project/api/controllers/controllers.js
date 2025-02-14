import { posts } from "../models/database.js";
const masterKey = process.env.masterKey;

export const allPosts = (req, res) => {
  return res.json(posts);
};

export const specificPost = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) return res.status(404).json({ message: "Post not found." });
  return res.json(post);
};

export const addPost = (req, res) => {
  const lastId = posts.length > 0 ? parseInt(posts.at(-1).id) : 0;

  const newPost = {
    id: lastId + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: req.body.date,
  };
  const post = posts.find(
    (post) => post.title.toLowerCase() == newPost.title.toLowerCase()
  );
  if (post) {
    return res
      .status(409)
      .json(`Post already exists in the database with id: ${post.id}.`);
  }
  posts.push(newPost);
  return res.status(201).json(newPost);
};

export const replacePost = (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) return res.status(404).json({ message: "Post not found" });
  const replacementPost = {
    id: id,
    title: req.body.title || posts[postIndex].title,
    content: req.body.content || posts[postIndex].content,
    author: req.body.author || posts[postIndex].author,
    date: posts[postIndex].date,
  };
  posts[postIndex] = replacementPost;
  return res.json(replacementPost);
};

export const deleteAll = (req, res) => {
  try {
    const key = req.query.key;
    if (key == masterKey) posts.length = 0;
    return res.json("All post are deleted.");
  } catch (error) {
    return res.status(404).send(error.data);
  }
};

export const deletePost = (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) return res.status(404).json({ message: "Post not found" });
  posts.splice(postIndex, 1);
  return res.json("Post deleted.");
};
