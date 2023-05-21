import jwt from 'jsonwebtoken';

// Borde ligga i en config.env fil.
const TOKEN_SECRET =
  '2s[C=ySgsVKW#d(:..MM$GFF#9KHm<mSnTTKVmuf^6a]YLWaWsfmVWX/6eq,D9Badfa3ppa2;KfM{Yp_([ms5Q<[82(T)JQ4bcPK%';
const TOKEN_EXPIRATION = '2d';

function signToken(id) {
  return jwt.sign({ id }, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRATION });
}

function createSendToken(user) {
  const token = signToken(user.Id);
  return token;
}

export { createSendToken, TOKEN_SECRET };
