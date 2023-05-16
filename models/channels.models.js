import { db } from "../server.js";

function getChannels() {
  console.log("hämta channels från db");
}

async function createChannel(channel) {
  await db.run("INSERT INTO Channel (Name) VALUES(?)", channel);
}

export { getChannels, createChannel };
