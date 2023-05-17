import { getChannelById } from '../models/channels.models.js';
import { createSubscription } from '../models/subscribe.models.js';

async function httpCreateSubscription(req, res) {
  const { channelId } = req.params;
  const { userId } = req;

  try {
    const channel = await getChannelById(channelId);

    if (!channel) {
      return res.status(494).json({ sucess: false, error: 'Not found. No channel with the given channel id found.' });
    }

    await createSubscription(channelId, userId);
    return res.status(200).json({ sucess: true });
  } catch (error) {
    console.log(error);
    if (error.errno === 19) {
      return res.status(409).json({ success: false, error: 'You are already subscribed to the channel!' });
    }
    return res.status(500).json({ success: false, error: 'Server error occurred while creating the subscription.' });
  }
}

export { httpCreateSubscription };
