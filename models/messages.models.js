import { db } from '../server.js';

async function getMessages() {
  const messages = await db.all("SELECT * FROM Message");
  return messages;
}

async function createMessage(message) {
  await db.run('INSERT INTO Message (Text) VALUES(?)', message);
}

export { getMessages, createMessage };
