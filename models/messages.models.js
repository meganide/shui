import { db } from '../server.js';

function getMessages() {
  console.log('hämta messages från db');
}

async function createMessage(message) {
  await db.run('INSERT INTO Message (Text) VALUES(?)', message);
}

export { getMessages, createMessage };
