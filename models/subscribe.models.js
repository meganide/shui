import { db } from '../server.js';

async function createSubscription(channelId, userId) {
  await db.run('INSERT INTO Subscription (ChannelId, UserId) VALUES (?,?)', [channelId, userId]);
}

async function getSubscription(channelId, userId) {
  const subscription = await db.get('SELECT * FROM Subscription WHERE (ChannelId, UserId) = (?,?)', [channelId, userId]);
  return subscription
}

export { createSubscription,getSubscription };
