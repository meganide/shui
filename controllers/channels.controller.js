import { getChannels, createChannel } from "../models/channels.models.js";

async function httpGetChannels(req, res) {
  try {
    const channels = await getChannels();
    return res.status(200).json({ success: true, channels });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server error occurred while getting the channels.",
    });
  }
}

async function httpCreateChannel(req, res) {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, error: "Must specify a channel name." });
  }

  try {
    createChannel(name);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server error occurred while creating the channel.",
    });
  }
}

export { httpGetChannels, httpCreateChannel };
