import { AsyncDatabase } from 'promised-sqlite3';

async function createDbConnection() {
  const db = await AsyncDatabase.open('./db.sqlite');
  return db;
}

export { createDbConnection };
