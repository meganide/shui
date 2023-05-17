import express from "express";
import { userRouter } from './user.routes.js';
import { messagesRouter } from "./messages.router.js";
import { channelsRouter } from "./channels.router.js";
import { subscribeRouter } from "./subscribe.router.js";

const apiRouter = express.Router();

apiRouter.use('/user', userRouter);
apiRouter.use("/messages", messagesRouter);
apiRouter.use("/channel", channelsRouter);
apiRouter.use("/subscribe", subscribeRouter);

export { apiRouter };
