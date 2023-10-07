// routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', authController.getLogin);
router.post('/login', passport.authenticate('local', authController.postLogin));
router.get('/logout', authController.logout);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

module.exports = router;
