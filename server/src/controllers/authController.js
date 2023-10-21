const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();

const AppUser = require('../models/AppUser');
app.use(bodyParser.json());
const secretKey = 'your-secret-key';
const bcrypt = require('bcrypt');
const saltRounds = 10;

const register = async (req, res) => {
  const {
    email, password, firstName, lastName, country, state, city, postcode, termsAndConditions,
  } = req.body;

  const userExists = await AppUser.findOne({email})
  if (userExists) {
    return res.status(400).json({message: 'Email already in use'});
  }

  bcrypt.hash(password, saltRounds, async (hashErr, hashedPassword) => {
    if (hashErr) {
      return res.status(500).json({message: 'Error hashing password'});
    }

    const newUser = new AppUser({
      email, password: hashedPassword, firstName, lastName, country, state, city, postcode, termsAndConditions,
    });

    const saved = await newUser.save();
    const token = jwt.sign({userId: newUser._id}, secretKey, {expiresIn: '1h'});
    res.json({token, user: {...newUser.toObject(), password: undefined}});
  });
}

const login = async (req, res) => {
  // TODO: to be implemented
}

module.exports = {register, login};
