import { db } from '../server.js';

async function createMessageInChannel(channelId, userId, messageId) {
  await db.run('INSERT INTO MessageToChannelToUser (ChannelId, UserId, MessageId) VALUES (?,?,?)', [
    channelId,
    userId,
    messageId,
  ]);
}

export {createMessageInChannel}