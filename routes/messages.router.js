import express from 'express';
import { httpCreateMessage, httpGetMessages } from '../controllers/messages.controller.js';
import { isLoggedIn } from "../controllers/user.controller.js";

const messagesRouter = express.Router();

messagesRouter.get('/', httpGetMessages);
messagesRouter.post('/', isLoggedIn, httpCreateMessage);

export { messagesRouter };
