const AppRole = require('../models/app-role');
const AppUser = require('../models/app-user');
const bcrypt = require('bcrypt');
const {writeJwtToken} = require("../util/auth-token");
const appRoles = require("../constants/app-roles");
const Employer = require("../models/employer");
const saltRounds = 10;

// Registration endpoint
const register = async (req, res) => {
  // Destructure the payload from req.body
  const {
    email, password, firstName, lastName, country, state, city, postcode, termsAndConditions,
  } = req.body;

  // Check if the user already exists
  const userExists = await AppUser.findOne({email});
  if (userExists) return res.status(400).json({message: 'Email already in use'});

  // Get the user role
  const userRole = await AppRole.findOne({normalizedName: appRoles.freeUser.normalizedName}).exec();
  if (!userRole) return res.status(500).json({message: 'Internal server error'});

  // Hash the password
  bcrypt.hash(password, saltRounds, async (hashErr, hashedPassword) => {
    if (hashErr) return res.status(500).json({message: 'Error hashing password'});

    // Create a new user
    const newUser = new AppUser({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      country,
      state,
      city,
      postcode,
      termsAndConditions,
      roles: [userRole.normalizedName]
    });

    // Save the user to the database
    const ignore = await newUser.save();

    // Create a JWT token
    const jwtToken = writeJwtToken({user: newUser});
    if (!jwtToken) return res.status(500).json({message: 'Internal server error'});

    // Return the token and the user details
    return res.json({token: jwtToken, user: {firstName: firstName, lastName: lastName}});
  });
};

// Login endpoint
const login = async (req, res) => {
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
      const jwtToken = writeJwtToken({user});
      if (!jwtToken) return res.status(500).json({message: 'Internal server error'});

      // Return the token and the user details
      return res.json({token: jwtToken, user: {firstName: user.firstName, lastName: user.lastName}});
    }
    return res.status(401).json({message: 'Invalid email or password'});
  });
};

// Register as employer endpoint
const onboardEmployer = async (req, res) => {
  const userId = req.userId;
  const roleNames = req.roles;
  const employerDetails = req.body;

  // Check if the user is already registered as employer
  const isEmployer = roleNames.some(role => role === appRoles.employer.normalizedName);
  if (isEmployer) return res.status(400).json({message: 'Already registered as employer'});

  // Get the employer role
  const employerRole = await AppRole.findOne({normalizedName: appRoles.employer.normalizedName}).exec();
  if (!employerRole) return res.status(500).json({message: 'Internal server error'});

  // Add the employer role to the user
  const user = await AppUser.findById(userId).exec();
  if (!user) return res.status(401).json({message: 'Unauthorized'});

  // Add the employer role to the user
  user.roles.push(employerRole.normalizedName);

  // Update the user in the database
  await user.save()
    .then(async (savedDoc) => {
      // Create a new employer
      const newEmployer = new Employer({...employerDetails, userId: user._id});
      await newEmployer.save().then(() => {
        // If user update successful, create a JWT token
        const jwtToken = writeJwtToken({user: savedDoc});
        if (!jwtToken) return res.status(500).json({message: 'Internal server error'});

        // Return the token and the user details
        return res.json({token: jwtToken, user: {firstName: savedDoc.firstName, lastName: savedDoc.lastName}});
      }).catch(() => {
        return res.status(500).json({message: 'Internal server error'});
      });
    })
    .catch(() => res.status(500).json({message: 'Internal server error'}));
};

// Profile endpoint
const profile = async (req, res) => {
  // Get the user id from the request
  const userId = req.userId;

  const resp = await AppUser.findById(userId, {password: 0});
  if (!resp) return res.status(401).json({message: 'Unauthorized'});

  // Return the user details
  res.json({...resp._doc, password: undefined});
};

// Profile Update endpoint
const updateProfile = async (req, res) => {
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
};


module.exports = {register, login, onboardEmployer, profile, updateProfile};
