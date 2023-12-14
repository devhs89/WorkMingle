const express = require('express');
const {
  register, login, profile, updateProfile, onboardEmployer
} = require("../controllers/account-controller");
const {authenticateUser, authenticateEmployer} = require("../middlewares/auth-middleware");
const {postJob, postedJobs, updateJob, deleteJob} = require("../controllers/employer-controller");
const {allJobs, searchJobs, showJob, applyJob} = require("../controllers/jobs-controller");
const fileHandler = require("../middlewares/file-handler-middleware");
const {createCheckoutSession} = require("../controllers/membership-controller");
const router = express.Router();

// Registration route
router.post('/account/register', register);

// Login route
router.post('/account/login', login);

// All jobs route
router.post('/jobs', allJobs);

// Search jobs route
router.post('/jobs/search', searchJobs);

// Show job route
router.post('/job/show', showJob);

// Show job route
router.post('/job/apply', authenticateUser, fileHandler, applyJob);

// Profile route with authentication middleware
router.post('/account/profile', authenticateUser, profile);

// Profile update route with authentication middleware
router.put('/account/update-profile', authenticateUser, updateProfile);

// Register as employer route with authentication middleware
router.post('/account/onboard-employer', authenticateUser, onboardEmployer);

// Posted jobs route with employer authentication middleware
router.post('/employer/posted-jobs', authenticateEmployer, postedJobs);

// Post job route with employer authentication middleware
router.post('/employer/post-job', authenticateEmployer, postJob);

// Update job route with employer authentication middleware
router.put('/employer/update-job', authenticateEmployer, updateJob);

// Delete job route with employer authentication middleware
router.post('/employer/delete-job', authenticateEmployer, deleteJob);

// Create checkout session route with user authentication middleware
router.post('/payment/create-checkout-session', authenticateUser, createCheckoutSession);

module.exports = router;