import db from "../models/database.js";
import axios from "axios";
import { countries_list } from "../utils/countries.js";

const apiKey = process.env.APIKEY;
const apiUrl = "https://www.googleapis.com/books/v1/volumes";

export const renderHome = async (req, res) => {
  const result = await db.query("SELECT * FROM books ORDER BY rating DESC");
  const books = result.rows;
  res.render("index.ejs", { books: books, title: "My Books" });
};

export const addBook = (req, res) => {
  res.render("newBook.ejs", { title: "Add Book" });
};

export const createBook = async (req, res) => {
  const input = req.body.title.trim().toLowerCase();
  const authorName = req.body.author.trim().toLowerCase();
  const review = req.body.review;
  const rating = req.body.rating;

  const config = {
    headers: { key: apiKey },
    params: { q: input },
  };

  try {
    const { data: response } = await axios.get(apiUrl, config);
    const bookList = response.items;

    const book = bookList.find(
      (book) =>
        book.volumeInfo.title.toLowerCase().includes(input) &&
        book.volumeInfo.publishedDate
    );

    if (!book) {
      console.error("Book not found for input:", input);
      return res.status(404).send("Book not found");
    }

    const imageUrl =
      book.volumeInfo.imageLinks?.large ||
      book.volumeInfo.imageLinks?.medium ||
      book.volumeInfo.imageLinks?.thumbnail ||
      null;

    const author =
      book.volumeInfo.authors && book.volumeInfo.authors.length > 0
        ? book.volumeInfo.authors[0]
        : "Unknown Author";

    await db.query(
      "INSERT INTO books (book_id, title, author, date, description, image_url, review, rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        book.id,
        book.volumeInfo.title,
        author,
        book.volumeInfo.publishedDate,
        book.volumeInfo.description,
        imageUrl,
        review,
        rating || 0,
      ]
    );
    res.redirect("/");
  } catch (err) {
    console.error("Error creating book:", err);
    res.status(500).send("Error creating book");
  }
};

export const editBook = async (req, res) => {
  const bookId = req.params.id;
  const result = await db.query("SELECT * FROM books WHERE book_id = $1", [
    bookId,
  ]);
  const book = result.rows[0];
  res.render("editBook.ejs", { book: book, title: "Edit Book" });
};

export const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const review = req.body.review;
  const rating = req.body.rating;
  await db.query(
    "UPDATE books SET review = $1, rating = $2 WHERE book_id = $3",
    [review, rating, bookId]
  );
  res.redirect("/");
};

export const deleteBook = async (req, res) => {
  const bookId = req.params.id;
  await db.query("DELETE FROM books WHERE book_id = $1", [bookId]);
  res.redirect("/");
};
