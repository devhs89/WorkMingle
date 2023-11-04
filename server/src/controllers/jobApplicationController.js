const JobApplication = require('../models/jobApplication');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'uploads', // Store uploaded files in the 'uploads' directory
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

createJobApplication = upload.single('resume'),async (req, res) => {
  
    const {resume, applicationDate, attachments, references, status} = req.body
    const newApplication = new JobApplication({resume, applicationDate, attachments, references, status});
    try {
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(500).json({ error: 'Error creating job application' });
  }
};

getAllJobApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching job applications' });
  }
};

module.exports = {createJobApplication, getAllJobApplications}