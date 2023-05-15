import express from 'express';
import { messagesRouter } from './messages.router.js';

const apiRouter = express.Router();

apiRouter.use('/messages', messagesRouter);

export { apiRouter };
