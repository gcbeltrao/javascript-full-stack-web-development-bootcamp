import express from "express";
import pg from "pg";

const app = express();
const port = 3000;

let quiz = [];

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  password: "BZZe4cE^aQ396M!@11SLpP",
  database: "world",
  port: 5432,
});

db.connect();

async function getData() {
  try {
    const response = await db.query("SELECT * FROM flags");
    quiz = response.rows;
  } catch (err) {
    console.error("Erro ao buscar usuários: ", err);
    throw err;
  } finally {
    console.log("Consulta finalizada");
    db.end();
  }
}

getData();

let totalCorrect = 0;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", (req, res) => {
  totalCorrect = 0;
  nextQuestion();
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.name.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  currentQuestion = randomCountry;
  console.log(currentQuestion);
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
