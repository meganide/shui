import Express from "express";
import { createDbConnection, createTable } from "./utils/db.js";

let db;

const app = Express();

const PORT = process.env.PORT || 8001;

async function startServer() {
  db = await createDbConnection();
  await createTable();

  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
}

startServer();

export { db };
