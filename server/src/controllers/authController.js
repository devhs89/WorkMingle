const register = (req, res, next) => {
  res.send('You have reached the signup endpoint');
};

const login = (req, res, next) => {
  res.send('You have reached the login endpoint');
};

module.exports = {register, login};