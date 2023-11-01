const AppUser = require('../models/app-user');
const bcrypt = require('bcrypt');
const {writeJwtToken} = require("../util/auth-token");
const logWithWinston = require("../util/winston-logger");
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
        email, password: hashedPassword, firstName, lastName, country, state, city, postcode, termsAndConditions
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
    res.status(500).json({message: 'Internal server error'});
    logWithWinston.error(e.message);
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
      if (err) return res.status(500).json({message: 'Internal server error'});

      if (result) {
        // Create a JWT token
        const token = writeJwtToken({user});
        if (!token) return res.status(500).json({message: 'Internal server error'});

        // Return the token and the user details
        return res.json({token, user: {firstName: user.firstName, lastName: user.lastName}});
      }
      return res.status(401).json({message: 'Invalid email or password'});
    });
  } catch (e) {
    logWithWinston.error(e.message);
    res.status(500).json({message: 'Internal server error'});
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
    res.json({...resp._doc, password: undefined});
  } catch (e) {
    logWithWinston.error(e.message);
    res.status(500).json({message: 'Internal server error'});
  }
};

// Profile Update endpoint
const updateProfile = async (req, res) => {
  try {
    // Get the user ID from the request
    const userId = req.userId;
    const {firstName, lastName, country, state, city, postcode} = req.body;

    // Update the user profile
    const updatedProfile = await AppUser.findOneAndUpdate({_id: userId}, {
      firstName: firstName, lastName: lastName, country: country, state: state, city: city, postcode: postcode,
    }, {new: true});
    if (!updatedProfile) return res.status(401).json({message: 'Unauthorized'});

    // Return a success response
    return res.json({...updatedProfile._doc, password: undefined});
  } catch (e) {
    logWithWinston.error(e.message);
    res.status(500).json({message: 'Internal server error'});
  }
};


module.exports = {register, login, profile, updateProfile};
