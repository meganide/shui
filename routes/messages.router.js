import express from 'express';
import { httpCreateMessage, httpGetMessagesByChannelId } from '../controllers/messages.controller.js';
import { isLoggedIn } from "../middleware/requireAuth.middleware.js";

const messagesRouter = express.Router();

messagesRouter.get('/:channelId', httpGetMessagesByChannelId);
messagesRouter.post('/', isLoggedIn, httpCreateMessage);

export { messagesRouter };
