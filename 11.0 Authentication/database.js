import pg from "pg";

const db = new pg.Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

db.connect()
  .then(() => console.log("Banco de dados conectado!"))
  .catch((err) => console.error("Erro ao conectar ao banco:", err));

process.on("SIGINT", async () => {
  console.log("Encerrando servidor...");
  await db.end(); // Fecha a conexão com o PostgreSQL
  console.log("Conexão com o banco fechada.");
  process.exit();
});

export default db;
