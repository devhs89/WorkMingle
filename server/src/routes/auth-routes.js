const express = require('express');
const {
  register, login, profile, updateProfile, registerAsEmployer, validateAuthToken
} = require("../controllers/auth-controller");
const {authenticateUser} = require("../middlewares/auth-middleware");
const router = express.Router();

// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);

// Validate auth token route
router.post('/validate-auth-token', authenticateUser, validateAuthToken);

// Profile route with authentication middleware
router.post('/profile', authenticateUser, profile);

// Profile update route with authentication middleware
router.put('/update-profile', authenticateUser, updateProfile);

// Register as employer route with authentication middleware
router.post('/employer/register', authenticateUser, registerAsEmployer);

module.exports = router;