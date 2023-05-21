import { db } from '../server.js';

// localhost:8001/api/messages?channelId=1&sort=createdAt
async function getMessagesInChannel(channelId, sort) {
  let query = `
    SELECT Message.*
    FROM Message
    INNER JOIN MessageToChannelToUser ON Message.id = MessageToChannelToUser.messageId
    WHERE MessageToChannelToUser.channelId = ?
  `;

  if (sort === 'desc') {
    query += ' ORDER BY createdAt DESC';
  }

  if (sort === 'asc') {
    query += ' ORDER BY createdAt ASC';
  }

  const params = [channelId];

  const messages = await db.all(query, params);
  return messages;
}


async function createMessage(message) {
  const messageId = await db.run('INSERT INTO Message (Text) VALUES(?)', message);
  return messageId;
}

export { getMessagesInChannel, createMessage };
