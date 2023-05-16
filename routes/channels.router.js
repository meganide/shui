import express from "express";
import {
  httpCreateChannels,
  httpGetChannels,
} from "../controllers/channels.controller";

const channelsRouter = express.Router();

channelsRouter.get("/", httpGetChannels);
channelsRouter.post("/", httpCreateChannels);

export { channelsRouter };
