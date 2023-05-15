import express from 'express';
import { getMessages } from "../controllers/messages.controller.js";

const messagesRouter = express.Router();

messagesRouter.use('/', getMessages);

export { messagesRouter };
