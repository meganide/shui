import { createMessageInChannel } from '../models/MessageToChannelToUser.models.js';
import { getChannelById } from '../models/channels.models.js';
import { createMessage, getMessages } from '../models/messages.models.js';
import { getSubscription } from '../models/subscribe.models.js';

async function httpGetMessages(req, res) {
  try {
    const messages = await getMessages();
    return res.status(200).json({ sucess: true, messages });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: 'Server error occurred while creating the message.' });
  }
}

async function httpCreateMessage(req, res) {
  let { text, channelIds } = req.body;
  const { userId } = req;
  const channelSubscriptions = [];

  if (!text) {
    return res.status(400).json({ success: false, error: 'Must specify a message.' });
  }

  if (text.length === 0) {
    return res.status(400).json({ success: false, error: 'Message must be at least 1 character.' });
  }

  try {
    // Is user subscribed or not to the channels
    for (const channelId of channelIds) {
      const isSubscribed = await getSubscription(channelId, userId);
      channelSubscriptions.push({ channelId, isSubscribed: isSubscribed ? true : false });
    }

    // Check if user is subscribed to all channels
    const subscribingToAllChannels = channelSubscriptions.every((channel) => channel.isSubscribed);

    // Which channels is the user not subscribed to?
    if (!subscribingToAllChannels) {
      const notSubscribedChannels = channelSubscriptions.filter((channel) => !channel.isSubscribed);

      for (const notSubscribedChannel of notSubscribedChannels) {
        const channel = await getChannelById(notSubscribedChannel.channelId);
        if (!channel) {
          return res
            .status(404)
            .json({ sucess: false, error: `Channel with Id: ${notSubscribedChannel.channelId} does not exist!` });
        }
        notSubscribedChannel.name = channel.Name;
      }

      return res.status(401).json({
        sucess: false,
        error: `You are not following the following channel: ${notSubscribedChannels[0].name}`,
      });
    }

    const { lastID: messageId } = await createMessage(text);

    // Post the message in every channel user is subscribed to
    for (const channelId of channelIds) {
      await createMessageInChannel(channelId, userId, messageId);
    }

    return res.status(200).json({ sucess: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: 'Server error occurred while creating the message.' });
  }
}

export { httpGetMessages, httpCreateMessage };
