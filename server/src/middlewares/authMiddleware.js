const jwt = require('jsonwebtoken');

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  // Get the token from the header
  const authHeader = req.header('Authorization');
  const token = authHeader.search('Bearer ') === 0 ? authHeader.replace('Bearer ', '') : authHeader;
  if (!token) {
    return res.status(401).json({message: 'Unauthorized'});
  }

  try {
    // Get the secret key from the environment variables
    const secretKey = process.env.SECRET_SIGNING_KEY;
    if (!secretKey) {
      return res.status(500).json({message: 'Internal server error'});
    }

    // Verify the token
    const {userId} = jwt.verify(token, secretKey);
    req.userId = userId;
    next();
  } catch (err) {
    return res.status(401).json({message: 'Invalid token'});
  }
};

module.exports = authenticateUser;
