import express from 'express';
import { signUpUser, signInUser } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/signup', signUpUser);
userRouter.post('/login', signInUser);

export { userRouter };
