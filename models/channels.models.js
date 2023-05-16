import { db } from "../server.js";

async function getChannels() {
  const channels = await db.all("SELECT * FROM Channel");
  return channels;
}

async function createChannel(channel) {
  await db.run("INSERT INTO Channel (Name) VALUES(?)", channel);
}

export { getChannels, createChannel };
