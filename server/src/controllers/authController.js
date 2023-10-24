const jwt = require('jsonwebtoken');
const AppUser = require('../models/AppUser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Registration endpoint
const register = async (req, res) => {
  // Destructure the payload from req.body
  const {
    email, password, firstName, lastName, country, state, city, postcode, termsAndConditions,
  } = req.body;

  // Check if the user already exists
  const userExists = await AppUser.findOne({email});
  if (userExists) {
    return res.status(400).json({message: 'Email already in use'});
  }

  // Hash the password
  bcrypt.hash(password, saltRounds, async (hashErr, hashedPassword) => {
    if (hashErr) {
      return res.status(500).json({message: 'Error hashing password'});
    }

    // Get the secret key from the environment variables
    const secretKey = process.env.SECRET_SIGNING_KEY;
    if (!secretKey) {
      return res.status(500).json({message: 'Internal server error'});
    }

    // Create a new user
    const newUser = new AppUser({
      email, password: hashedPassword, firstName, lastName, country, state, city, postcode, termsAndConditions,
    });

    // Save the user to the database
    const ignore = await newUser.save();

    // Create a JWT token
    const token = jwt.sign({userId: newUser._id}, secretKey, {expiresIn: '1h'});

    // Return the token and the user details
    res.json({token, userDetails: {firstName: newUser.firstName, lastName: newUser.lastName}});
  });
};

// Login endpoint
const login = async (req, res) => {
  // Destructure the payload from req.body
  const {email, password} = req.body;

  // Check if the user exists
  const user = await AppUser.findOne({email});
  if (!user) {
    return res.status(401).json({message: 'Invalid email or password'});
  }

  // Compare the password
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(500).json({message: 'Invalid email or password'});
    }

    if (result) {
      // If credentials match,
      // Get the secret key from the environment variables
      const secretKey = process.env.SECRET_SIGNING_KEY;
      if (!secretKey) {
        return res.status(500).json({message: 'Internal server error'});
      }

      // Create a JWT token
      const token = jwt.sign({userId: user._id}, secretKey, {expiresIn: '1h'});

      // Return the token and the user details
      res.json({token, user: {firstName: user.firstName, lastName: user.lastName}});
    } else {
      res.status(401).json({message: 'Invalid email or password'});
    }
  });
};

// Profile endpoint
const profile = async (req, res) => {
  // Get the user id from the request
  const userId = req.userId;

  // Get the user details from the database
  const user = await AppUser.findById(userId, {password: 0});
  if (!user) {
    return res.status(401).json({message: 'Unauthorized'});
  }

  // Return the user details
  res.json({userDetails: {...user._doc, password: undefined}});
};

module.exports = {register, login, profile};
