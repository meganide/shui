import { db } from "../server.js";

async function getChannels() {
  const channels = await db.all("SELECT * FROM Channel");
  return channels;
}

async function getChannelById(channelId) {
  const channel = await db.get("SELECT * FROM Channel WHERE id = ?", channelId);
  return channel;
}

async function createChannel(channel) {
  const createdChannel = await db.run(
    "INSERT INTO Channel (Name) VALUES(?)",
    channel
  );
  return createdChannel;
}

export { getChannels, getChannelById, createChannel };
