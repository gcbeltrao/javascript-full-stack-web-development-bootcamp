import db from "../models/database.js";
import { countries_list } from "../models/countries.js";

let currentUserId = 1;
let users = [];

async function getCurrentUser() {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  return users.find((user) => user.id == currentUserId);
}

async function checkVisisted() {
  const result = await db.query(
    "SELECT country_code FROM visited_countries where user_id = $1",
    [currentUserId]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });

  return countries;
}

export const renderHome = async (req, res) => {
  const currentUser = await getCurrentUser();
  const countries = await checkVisisted();
  const color = currentUser ? currentUser.color : null;
  const error = req.query.error;

  return res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: color,
    error: error,
  });
};

export const addCountry = async (req, res) => {
  const input = req.body.country?.trim();

  if (!input) {
    return res.redirect(
      "/?error=" + encodeURIComponent("Try a valid country.")
    );
  }

  const result = countries_list.find((country) =>
    country.country_name.toLowerCase().includes(input.toLowerCase())
  );

  if (!result) {
    return res.redirect(
      "/?error=" + encodeURIComponent("Country does not exist, try again.")
    );
  }
  const countryCode = result.country_code;

  try {
    await db.query(
      "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
      [countryCode, currentUserId]
    );
    res.redirect("/");
  } catch (err) {
    console.error("Database Error:", err);
    res.redirect("/?error=" + encodeURIComponent("Could not insert country."));
  }
};

export const changeUser = (req, res) => {
  if (req.body.add === "new") {
    return res.render("new.ejs");
  }
  currentUserId = Number(req.body.user);
  res.redirect("/");
};

export const addUser = async (req, res) => {
  const name = req.body.name;
  const color = req.body.color;
  if (name == "") {
    return res.render("new.ejs", { error: true });
  }
  const result = await db.query(
    "INSERT INTO users (name, color) VALUES ($1, $2) RETURNING *;",
    [name, color]
  );
  const id = result.rows[0].id;
  currentUserId = id;

  return res.redirect("/");
};
