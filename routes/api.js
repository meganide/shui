import express from 'express';
import { messagesRouter } from './messages.router.js';
import { userRouter } from './user.routes.js';

const apiRouter = express.Router();

apiRouter.use('/messages', messagesRouter);

apiRouter.use('/user', userRouter);

export { apiRouter };
