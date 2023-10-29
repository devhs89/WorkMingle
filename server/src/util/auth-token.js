const jwt = require("jsonwebtoken");

const readJwtToken = ({authHeader}) => {
  return authHeader.search('Bearer ') === 0 ? authHeader.replace('Bearer ', '') : authHeader;
};

const writeJwtToken = ({user, expireAt = null}) => {
  // Get the secret key from the environment variables
  const secretKey = process.env.SECRET_SIGNING_KEY;
  if (!secretKey) return null;

  // Get the current time
  const issuedAt = Math.floor(new Date().getTime() / 1000);
  // Set the expiry time
  expireAt = expireAt && Number.isInteger(expireAt) ? issuedAt + expireAt : issuedAt + 3600;

  // Create a JWT token
  return jwt.sign({userId: user._id, iat: issuedAt, exp: expireAt}, secretKey);
};

const verifyJwtToken = ({token}) => {
  // Get the secret key from the environment variables
  const secretKey = process.env.SECRET_SIGNING_KEY;
  if (!secretKey) return null;

  // Verify the token
  return jwt.verify(token, secretKey, (err, decoded) => err ? null : decoded);
};

module.exports = {readJwtToken, writeJwtToken, verifyJwtToken};