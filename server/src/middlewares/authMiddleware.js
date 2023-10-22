const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({message: 'Unauthorized'});
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded)
    req.userId = decoded;
    next();
  } catch (err) {
    console.log(err)
    return res.status(401).json({message: 'Invalid token'});
  }
};

module.exports = authenticateUser;
