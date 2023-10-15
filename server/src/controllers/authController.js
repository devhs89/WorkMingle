const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();

// Import your Mongoose model
const AppUser = require('../models/AppUser');

app.use(bodyParser.json());

const secretKey = 'your-secret-key';

const bcrypt = require('bcrypt');
const saltRounds = 10; // The number of salt rounds to use for hashing

const register = async (req, res) => {
  const {
    email, password, firstName, lastName, country, state, city, postcode, termsAndConditions,
  } = req.body;

  // Check if the email is already in use
  const userExists = await AppUser.findOne({email})
  if (userExists) {
    return res.status(400).json({message: 'Email already in use'});
  }

  // Hash the password
  bcrypt.hash(password, saltRounds, async (hashErr, hashedPassword) => {
    if (hashErr) {
      return res.status(500).json({message: 'Error hashing password'});
    }

    // Create a new user with the hashed password
    const newUser = new AppUser({
      email, password: hashedPassword, firstName, lastName, country, state, city, postcode, termsAndConditions,
    });

    // Save the user to the database
    const saved = await newUser.save();

    // Generate a JWT for the newly registered user
    const token = jwt.sign({userId: newUser._id}, secretKey, {expiresIn: '1h'});

    res.json({token, user: {...newUser.toObject(), password: undefined}}); // Omit the password in the response for security
  });
}

const login = (req, res) => {
  res.send('You have reached the login endpoint');
};

module.exports = {register, login};