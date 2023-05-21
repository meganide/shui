import { db } from '../server.js';

// localhost:8001/api/messages?channelId=1&sort=createdAt
async function getMessages(channelId, sort) {
  let query = `
    SELECT Message.*
    FROM Message
    INNER JOIN MessageToChannelToUser ON Message.id = MessageToChannelToUser.messageId
    WHERE MessageToChannelToUser.channelId = ?
  `;
  if (sort === 'createdAt') {
    query += ' ORDER BY createdAt DESC';
  }

  const params = [channelId];

  const messages = await db.all(query, params);
  return messages;
}

// async function getMessages() {
//   const messages = await db.all("SELECT * FROM Message");
//   return messages;
// }

async function createMessage(message) {
  const messageId = await db.run('INSERT INTO Message (Text) VALUES(?)', message);
  return messageId;
}

export { getMessages, createMessage };
