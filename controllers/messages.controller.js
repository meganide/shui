import { createMessage } from '../models/messages.models.js';
import { db } from '../server.js';

async function httpGetMessages(req, res) {
  console.log('hej');
}

async function httpCreateMessage(req, res) {
  const { text } = req.body;

  try {
    createMessage(text);
    return res.status(200).json({ sucess: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: 'Server error occurred while creating the message.' });
  }
}

export { httpGetMessages, httpCreateMessage };
