const jwt = require('jsonwebtoken');

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  // Get the token from the header
  const token = req.header('Authorization').search(' ')[1];
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
