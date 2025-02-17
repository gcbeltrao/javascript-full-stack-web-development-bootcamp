import db from "../models/database.js";

export const renderHome = async (req, res) => {
  const { rows: items } = await db.query(
    "SELECT * FROM table_list ORDER BY id ASC;"
  );
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
};

export const addPost = async (req, res) => {
  const item = req.body.newItem?.trim();
  await db.query("INSERT INTO table_list (title) VALUES ($1);", [item]);
  res.redirect("/");
};

export const editPost = async (req, res) => {
  const id = req.body.updatedItemId;
  const title = req.body.updatedItemTitle;
  await db.query("UPDATE table_list SET title = ($1) WHERE id = $2;", [
    title,
    id,
  ]);
  res.redirect("/");
};

export const deletePost = async (req, res) => {
  const id = req.body.deleteItemId;
  await db.query("DELETE FROM table_list WHERE id = $1;", [id]);
  res.redirect("/");
};
