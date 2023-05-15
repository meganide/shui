import { createMessage, getMessages } from '../models/messages.models.js';

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
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ success: false, error: 'Must specify a message.' });
  }

  if (text.length === 0) {
    return res.status(400).json({ success: false, error: 'Message must be at least 1 character.' });
  }

  try {
    await createMessage(text);
    return res.status(200).json({ sucess: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: 'Server error occurred while creating the message.' });
  }
}

export { httpGetMessages, httpCreateMessage };
