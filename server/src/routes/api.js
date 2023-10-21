const express = require('express');
const router = express.Router();
const jobApplicationController = require('../controllers/jobApplicationController');

// Define API routes
router.post('/job-applications', jobApplicationController.createJobApplication);
router.get('/job-applications', jobApplicationController.getAllJobApplications);

module.exports = router;
