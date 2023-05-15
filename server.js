import Express from 'express';
import { createDbConnection, createTable } from './utils/db.js';
import { apiRouter } from './routes/api.js';

let db;

const app = Express();

app.use('/api/', apiRouter);

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
