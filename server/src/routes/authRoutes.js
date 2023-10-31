const express = require('express');
const {register, login, profile, updateProfile} = require("../controllers/authController");
const authenticateUser = require("../middlewares/authMiddleware");
const router = express.Router();

// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);

// Profile route with authentication middleware
router.post('/profile', authenticateUser, profile);

// Profile update route with authentication middleware
router.put('/update-profile', authenticateUser, updateProfile);

module.exports = router;