import { checkIfUserExists } from '../models/user.models.js';
import { TOKEN_SECRET } from '../utils/jwt.js';
import jwt from 'jsonwebtoken';

async function isLoggedIn(req, res, next) {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.replace('Bearer', '').trim();
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'You are not logged in.',
    });
  }

  try {
    const decodedUser = jwt.verify(token, TOKEN_SECRET);
    const freshUser = await checkIfUserExists(decodedUser.id);

    if (!freshUser) {
      return res.status(404).json({
        success: false,
        error: 'User not found.',
      });
    }

    req.userId = freshUser.Id;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Invalid token.',
    });
  }
}

export { isLoggedIn };
