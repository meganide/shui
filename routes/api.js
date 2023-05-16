import express from "express";
import { userRouter } from './user.routes.js';
import { messagesRouter } from "./messages.router.js";
import { channelsRouter } from "./channels.router.js";

const apiRouter = express.Router();

apiRouter.use('/user', userRouter);
apiRouter.use("/messages", messagesRouter);
apiRouter.use("/channel", channelsRouter);

export { apiRouter };
