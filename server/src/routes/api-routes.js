const express = require('express');
const {
  register, login, profile, updateProfile, registerAsEmployer
} = require("../controllers/account-controller");
const {authenticateUser, authenticateEmployer} = require("../middlewares/auth-middleware");
const {postJob} = require("../controllers/employer-controller");
const router = express.Router();

// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);

// Profile route with authentication middleware
router.post('/profile', authenticateUser, profile);

// Profile update route with authentication middleware
router.put('/update-profile', authenticateUser, updateProfile);

// Register as employer route with authentication middleware
router.post('/employer/register', authenticateUser, registerAsEmployer);

// Post job route with employer authentication middleware
router.post('/employer/post-job', authenticateEmployer, postJob);

module.exports = router;