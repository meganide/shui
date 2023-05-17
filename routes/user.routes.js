import express from "express";
import {
  signUpUser,
  signInUser,
  isLoggedIn,
  test,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/signup", signUpUser);
userRouter.post("/login", signInUser);

userRouter.get("/test", isLoggedIn, test);

export { userRouter };
