import express from "express";
import {
  httpCreateChannel,
  httpGetChannels,
} from "../controllers/channels.controller.js";
import { isLoggedIn } from "../controllers/user.controller.js";

const channelsRouter = express.Router();

channelsRouter.get("/", httpGetChannels);
channelsRouter.post("/", isLoggedIn, httpCreateChannel);

export { channelsRouter };
