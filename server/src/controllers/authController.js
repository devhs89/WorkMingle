const AppUser = require('../models/AppUser');
const bcrypt = require('bcrypt');
const {writeJwtToken} = require("../util/auth-token");
const saltRounds = 10;

// Registration endpoint
const register = async (req, res) => {
  try {
    // Destructure the payload from req.body
    const {
      email, password, firstName, lastName, country, state, city, postcode, termsAndConditions,
    } = req.body;

    // Check if the user already exists
    const userExists = await AppUser.findOne({email});
    if (userExists) return res.status(400).json({message: 'Email already in use'});

    // Hash the password
    bcrypt.hash(password, saltRounds, async (hashErr, hashedPassword) => {
      if (hashErr) return res.status(500).json({message: 'Error hashing password'});

      // Create a new user
      const newUser = new AppUser({
        email, password: hashedPassword, firstName, lastName, country, state, city, postcode, termsAndConditions,
      });

      // Save the user to the database
      const ignore = await newUser.save();

      // Create a JWT token
      const payload = writeJwtToken({user: newUser});
      if (!payload) return res.status(500).json({message: 'Internal server error'});

      // Return the token and the user details
      return res.json({token: payload, user: {firstName: firstName, lastName: lastName}});
    });
  } catch (e) {
    return res.status(500).json({message: 'Internal server error'});
  }
};

// Login endpoint
const login = async (req, res) => {
  try {
    // Destructure the payload from req.body
    const {email, password} = req.body;

    // Check if the user exists
    const user = await AppUser.findOne({email});
    if (!user) return res.status(401).json({message: 'Invalid email or password'});

    // Compare the password
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.status(500).json({message: 'Invalid email or password'});

      if (result) {
        // Create a JWT token
        const token = writeJwtToken({user});
        if (!token) return res.status(500).json({message: 'Internal server error'});

        // Return the token and the user details
        return res.json({token, user: {firstName: user.firstName, lastName: user.lastName}});
      }
    });
  } catch (e) {
    return res.status(500).json({message: 'Internal server error'});
  }
};

// Profile endpoint
const profile = async (req, res) => {
  try {
    // Get the user id from the request
    const userId = req.userId;

    const resp = await AppUser.findById(userId, {password: 0});
    if (!resp) return res.status(401).json({message: 'Unauthorized'});

    // Return the user details
    res.json(resp._doc ? {...resp._doc, password: undefined} : {...resp, password: undefined});
  } catch (e) {
    return res.status(500).json({message: 'Internal server error'});
  }
};

module.exports = {register, login, profile};
