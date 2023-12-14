const {readJwtToken, verifyJwtToken} = require("../util/auth-token");
const {employer, basicUser} = require("../constants/app-roles");

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  try {
    // Check if the token is valid and has user role
    _performVerification({req, res, roleToCheck: basicUser.normalizedName});
    next();
  } catch (err) {
    return res.status(401).json({message: 'Invalid token'});
  }
};

// Middleware to authenticate employer
const authenticateEmployer = (req, res, next) => {
  try {
    // Check if the token is valid and has employer role
    _performVerification({req, res, roleToCheck: employer.normalizedName});
    next();
  } catch (err) {
    return res.status(401).json({message: 'Invalid token'});
  }
};

const _performVerification = ({req, res, roleToCheck}) => {
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
  if (!tokenPayload.roles.map(r => r.toUpperCase()).includes(roleToCheck.toUpperCase())) return res.status(401).json({message: 'Unauthorized'});
  req.roles = tokenPayload.roles;
  return req;
};

module.exports = {authenticateUser, authenticateEmployer};
