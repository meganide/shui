import express from "express";
import { messagesRouter } from "./messages.router.js";
import { channelRouter } from "./channel.router.js";

const apiRouter = express.Router();

apiRouter.use("/messages", messagesRouter);
apiRouter.use("/channel", channelRouter);

export { apiRouter };
