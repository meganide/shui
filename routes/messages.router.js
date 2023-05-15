import express from 'express';
import { httpCreateMessage, httpGetMessages } from '../controllers/messages.controller.js';

const messagesRouter = express.Router();

messagesRouter.get('/', httpGetMessages);
messagesRouter.post('/', httpCreateMessage);

export { messagesRouter };
