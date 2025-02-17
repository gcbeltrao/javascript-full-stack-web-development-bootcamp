import pg from "pg";

const db = new pg.Client({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
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
