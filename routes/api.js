import express from "express";
import { messagesRouter } from "./messages.router.js";
import { channelsRouter } from "./channels.router.js";

const apiRouter = express.Router();

apiRouter.use("/messages", messagesRouter);
apiRouter.use("/channel", channelsRouter);

export { apiRouter };
