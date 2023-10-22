const express = require('express');
const {register, login, profile} = require("../controllers/authController");
const authenticateUser = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/profile', authenticateUser, profile);

module.exports = router;