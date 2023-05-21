import { createUser, login } from '../models/user.models.js';
import { createSendToken } from '../utils/jwt.js';

async function signUpUser(req, res) {
  const { userName, password, firstName, lastName } = req.body;

  try {
    const user = await createUser(userName, password, firstName, lastName);

    if (user === 409) {
      return res.status(409).json({
        status: 'error',
        message: 'User already exists.',
      });
    }

    if (user === 400) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid request.',
      });
    }

    const token = createSendToken(user);

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Server error occurred while signing up the user.' });
  }
}

async function signInUser(req, res) {
  const { userName, password } = req.body;

  try {
    const user = await login(userName, password);

    if (user === 401) {
      return res.status(409).json({
        status: 'error',
        message: 'Invalid username or password.',
      });
    }

    const token = createSendToken(user);

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Server error occurred while signing in the user.' });
  }
}

export { signUpUser, signInUser };
