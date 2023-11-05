const express = require('express');
const router = express.Router();
const jobApplicationController = require('../controllers/jobApplicationController');
const { authenticateUser } = require('../middlewares/auth-middleware');
const multer = require('multer');

// Define the storage for multer
const storage = multer.diskStorage({
  destination: 'uploads/', // Store uploaded files in the 'uploads' directory
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});


const upload = multer({ storage });
// Define API routes
router.post('/create',authenticateUser,upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'attachments' }]),jobApplicationController.createJobApplication);
router.post('/', authenticateUser,jobApplicationController.getAllJobApplications);

module.exports = router;
