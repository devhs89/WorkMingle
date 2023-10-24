const jwt = require('jsonwebtoken');
const AppUser = require('../models/AppUser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Registration endpoint
const register = async (req, res) => {
  const {
    email, password, firstName, lastName, country, state, city, postcode, termsAndConditions,
  } = req.body;

  const userExists = await AppUser.findOne({email});
  if (userExists) {
    return res.status(400).json({message: 'Email already in use'});
  }

  bcrypt.hash(password, saltRounds, async (hashErr, hashedPassword) => {
    if (hashErr) {
      return res.status(500).json({message: 'Error hashing password'});
    }

    const secretKey = process.env.SECRET_SIGNING_KEY;
    if (!secretKey) {
      return res.status(500).json({message: 'Internal server error'});
    }

    const newUser = new AppUser({
      email, password: hashedPassword, firstName, lastName, country, state, city, postcode, termsAndConditions,
    });

    const ignore = await newUser.save();
    const token = jwt.sign({userId: newUser._id}, secretKey, {expiresIn: '1h'});
    res.json({token, user: {...newUser.toObject(), password: undefined}});
  });
};

// Login endpoint
const login = async (req, res) => {
  const {email, password} = req.body;

  const user = await AppUser.findOne({email});

  if (!user) {
    return res.status(401).json({message: 'Invalid email or password'});
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(500).json({message: 'Invalid email or password'});
    }

    if (result) {
      const secretKey = process.env.SECRET_SIGNING_KEY;
      if (!secretKey) {
        return res.status(500).json({message: 'Internal server error'});
      }

      const token = jwt.sign({userId: user._id}, secretKey, {expiresIn: '1h'});
      res.json({token, user: {...user.toObject(), password: undefined}});
    } else {
      res.status(401).json({message: 'Invalid email or password'});
    }
  });
};

// Profile endpoint
const profile = (req, res) => {
  const user = req.userId;
  res.json({user});
};

module.exports = {register, login, profile};
