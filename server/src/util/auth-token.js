const jwt = require("jsonwebtoken");

const readJwtToken = ({authHeader}) => {
  return authHeader?.search('Bearer ') === 0 ? authHeader.replace('Bearer ', '') : authHeader;
};

const writeJwtToken = ({user, expireAt = null}) => {
  // Get the secret key from the environment variables
  const secretKey = process.env.SECRET_SIGNING_KEY;
  if (!secretKey) return null;

  // Get the current time
  const issuedAt = Math.floor(new Date().getTime() / 1000);

  // Set the expiry time
  expireAt = expireAt && Number.isInteger(expireAt) ? issuedAt + expireAt : issuedAt + 3600 * 24;

  // Set the payload
  const claims = {userId: user._id, roles: user.roles, activeMember: user.activeMember, iat: issuedAt, exp: expireAt};
  if (user.memberId) claims.memberId = user.memberId;

  // Create a JWT token
  return jwt.sign(claims, secretKey);
};

const verifyJwtToken = ({token}) => {
  // Get the secret key from the environment variables
  const secretKey = process.env.SECRET_SIGNING_KEY;
  if (!secretKey) return null;

  // Verify the token
  return jwt.verify(token, secretKey, (err, decoded) => err ? null : decoded);
};

module.exports = {readJwtToken, writeJwtToken, verifyJwtToken};
