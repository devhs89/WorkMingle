const express = require('express');
const {
  register, login, profile, updateProfile, onboardEmployer
} = require("../controllers/account-controller");
const {authenticateUser, authenticateEmployer} = require("../middlewares/auth-middleware");
const {postJob, postedJobs, updateJob, deleteJob} = require("../controllers/employer-controller");
const {allJobs, searchJobs} = require("../controllers/jobs-controller");
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

// Posted jobs route with employer authentication middleware
router.post('/employer/posted-jobs', authenticateEmployer, postedJobs);

// Post job route with employer authentication middleware
router.post('/employer/post-job', authenticateEmployer, postJob);

// Update job route with employer authentication middleware
router.post('/employer/update-job', authenticateEmployer, updateJob);

// Delete job route with employer authentication middleware
router.post('/employer/delete-job', authenticateEmployer, deleteJob);

// All jobs route with user authentication middleware
router.post('/jobs', authenticateUser, allJobs);

// Search jobs route with user authentication middleware
router.post('/jobs/search', authenticateUser, searchJobs);

module.exports = router;