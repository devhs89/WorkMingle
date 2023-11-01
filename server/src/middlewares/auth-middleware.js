const {readJwtToken, verifyJwtToken} = require("../util/auth-token");

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  // Get the token from the request header
  const token = readJwtToken({authHeader: req.headers['authorization']});
  if (!token) {
    return res.status(401).json({message: 'Unauthorized'});
  }

  try {
    // Verify the token
    const {userId} = verifyJwtToken({token});
    req.userId = userId;
    next();
  } catch (err) {
    return res.status(401).json({message: 'Invalid token'});
  }
};

module.exports = authenticateUser;
