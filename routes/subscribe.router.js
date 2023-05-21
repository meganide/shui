import express from 'express';
import { httpCreateSubscription } from '../controllers/subscribe.controller.js';
import { isLoggedIn } from '../middleware/requireAuth.middleware.js';

const subscribeRouter = express.Router();

subscribeRouter.post('/:channelId', isLoggedIn, httpCreateSubscription);

export { subscribeRouter };
