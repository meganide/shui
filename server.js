import Express from 'express';
import { createDbConnection } from './utils/db.js';

const app = Express();

const PORT = process.env.PORT || 8001;

async function startServer() {
  await createDbConnection();

  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
}

startServer();
