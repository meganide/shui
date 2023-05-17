import jwt from "jsonwebtoken";
import { promisify } from "util";

import { createUser, login, checkIfUserExists } from "../models/user.models.js";

// Borde ligga i en config.env fil.
const TOKEN_SECRET =
  "2s[C=ySgsVKW#d(:..MM$GFF#9KHm<mSnTTKVmuf^6a]YLWaWsfmVWX/6eq,D9Badfa3ppa2;KfM{Yp_([ms5Q<[82(T)JQ4bcPK%";
const TOKEN_EXPIRATION = "2d";

const signToken = (id) => {
  return jwt.sign({ id: id }, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRATION });
};

const createSendToken = (user, statusCode, req, res) => {
  console.log(user);
  const token = signToken(user.Id);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const signUpUser = async (req, res, next) => {
  const { userName, password, firstName, lastName } = req.body;

  const result = await createUser(userName, password, firstName, lastName);

  if (result === 409) {
    return res.status(409).json({
      status: "error",
      message: "User already exists.",
    });
  }

  if (result === 400) {
    return res.status(400).json({
      status: "error",
      message: "Invalid request.",
    });
  }

  createSendToken(result, 200, req, res);
};

const signInUser = async (req, res) => {
  const { userName, password } = req.body;

  const result = await login(userName, password);

  if (result === 401) {
    return res.status(409).json({
      status: "error",
      message: "Invalid username or password.",
    });
  }

  createSendToken(result, 200, req, res);
};

const isLoggedIn = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.replace("Bearer", "").trim();
  }

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "You are not logged in.",
    });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, TOKEN_SECRET);
    const freshUser = await checkIfUserExists(decoded.id);

    if (!freshUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }

    req.userId = freshUser.Id;

    next();
  } catch (err) {
    return res.status(401).json({
      status: "error",
      message: "Invalid token.",
    });
  }
};

const test = async (req, res, next) => {
  console.log(
    "Du har tillgång till den här routen och användardata finns i req-objektet i next."
  );

  res.status(200).json({
    status: "success",
    data: {
      user: req.userId,
    },
  });
};

export { signUpUser, signInUser, isLoggedIn, test };
