import { db } from "../server.js";

async function createOwner(channelId, userId) {
  await db.run("INSERT INTO Owner (ChannelId, userId) VALUES(?)", {
    channelId,
    userId,
  });
}

export { createOwner };
