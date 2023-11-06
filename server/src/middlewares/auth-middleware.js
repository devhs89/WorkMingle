const {readJwtToken, verifyJwtToken} = require("../util/auth-token");
const {employer, user} = require("../constants/app-roles");

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  try {
    // Get the token from the request header
    const token = readJwtToken({authHeader: req.headers['authorization']});
    if (!token) {
      return res.status(401).json({message: 'Unauthorized'});
    }

    // Verify the token
    const tokenPayload = verifyJwtToken({token});
    // Check if the token has user id
    if (!tokenPayload.userId || !tokenPayload.roles || !tokenPayload.roles.length) return res.status(401).json({message: 'Unauthorized'});
    req.userId = tokenPayload.userId;
    // Check if the token has user role
    if (!tokenPayload.roles.map(r => r.toUpperCase()).includes(user.normalizedName)) return res.status(401).json({message: 'Unauthorized'});
    req.roles = tokenPayload.roles;
    next();
  } catch (err) {
    return res.status(401).json({message: 'Invalid token'});
  }
};

// Middleware to authenticate employer
const authenticateEmployer = (req, res, next) => {
  try {
    // Get the token from the request header
    const token = readJwtToken({authHeader: req.headers['authorization']});
    if (!token) {
      return res.status(401).json({message: 'Unauthorized'});
    }

    // Verify the token
    const tokenPayload = verifyJwtToken({token});
    // Check if the token has user id
    if (!tokenPayload.userId || !tokenPayload.roles || !tokenPayload.roles.length) return res.status(401).json({message: 'Unauthorized'});
    req.userId = tokenPayload.userId;
    // Check if the token has employer role
    if (!tokenPayload.roles.map(r => r.toUpperCase()).includes(employer.normalizedName)) return res.status(401).json({message: 'Unauthorized'});
    req.roles = tokenPayload.roles;
    next();
  } catch (err) {
    return res.status(401).json({message: 'Invalid token'});
  }
};

module.exports = {authenticateUser, authenticateEmployer};
