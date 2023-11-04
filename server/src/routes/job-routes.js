const express = require('express');
const router = express.Router();
const jobApplicationController = require('../controllers/jobApplicationController');
const { authenticateUser } = require('../middlewares/auth-middleware');

// Define API routes
router.post('/job/create',authenticateUser, jobApplicationController.createJobApplication);
router.post('/jobs', authenticateUser,jobApplicationController.getAllJobApplications);

module.exports = router;
