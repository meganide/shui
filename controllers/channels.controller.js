import { createChannels } from "../models/channels.models.js";

async function httpGetChannels(req, res) {
  console.log("hej");
}

async function httpCreateChannels(req, res) {
  const { name } = req.body;

  try {
    createChannels(name);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server error occurred while creating the message.",
    });
  }
}

export { httpGetChannels, httpCreateChannels };
