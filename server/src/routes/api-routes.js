const express = require('express');
const {
  register, login, profile, updateProfile, onboardEmployer
} = require("../controllers/account-controller");
const {authenticateUser, authenticateEmployer} = require("../middlewares/auth-middleware");
const {postJob} = require("../controllers/employer-controller");
const router = express.Router();

// Registration route
router.post('/account/register', register);

// Login route
router.post('/account/login', login);

// Profile route with authentication middleware
router.post('/account/profile', authenticateUser, profile);

// Profile update route with authentication middleware
router.put('/account/update-profile', authenticateUser, updateProfile);

// Register as employer route with authentication middleware
router.post('/account/onboard-employer', authenticateUser, onboardEmployer);

// Post job route with employer authentication middleware
router.post('/employer/post-job', authenticateEmployer, postJob);

module.exports = router;