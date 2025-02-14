import axios from "axios";
const apiUrl = "http://localhost:4000/";

export const allPosts = async (req, res) => {
  try {
    const { data: posts } = await axios.get(apiUrl);
    return res.render("index.ejs", { posts });
  } catch (error) {
    return res.send(error.data);
  }
};

export const newPost = (req, res) => {
  return res.render("post.ejs");
};

export const addPost = async (req, res) => {
  try {
    const newPost = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      date: new Date().toLocaleDateString("pt-BR"),
    };
    await axios.post(apiUrl, newPost);
    return res.redirect("/");
  } catch (error) {
    return res.send(error.data);
  }
};

export const editPost = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { data: post } = await axios.get(`${apiUrl}posts/${id}`);
    return res.render("post.ejs", { post });
  } catch (error) {
    return res.send(error.data);
  }
};

export const updatePost = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatePost = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    };
    await axios.patch(`${apiUrl}posts/${id}`, updatePost);
    return res.redirect("/");
  } catch (error) {
    return res.send(error.data);
  }
};

export const deleteAll = async (req, res) => {
  const config = {
    params: { key: "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT" },
  };
  await axios.delete(`${apiUrl}delete/all`, config);
  return res.redirect("/");
};

export const deletePost = async (req, res) => {
  const id = parseInt(req.params.id);
  await axios.delete(`${apiUrl}delete/${id}`);
  return res.redirect("/");
};
