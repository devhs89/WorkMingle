const JobApplication = require('../models/jobApplication');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'uploads', // Store uploaded files in the 'uploads' directory
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

exports.createJobApplication = upload.single('resume'),async (req, res) => {
  
    const name = req.body.name;
    const email = req.body.email;
    const resume = req.file.path; // Get the file path
    const newApplication = new JobApplication({ name, email, resume });
    try {
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(500).json({ error: 'Error creating job application' });
  }
};

/*exports.createJobApplication = async (req, res) => {
  const { name, email, resume } = req.body;
  const newApplication = new JobApplication({ name, email, resume });

  try {
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(500).json({ error: 'Error creating job application' });
  }
};*/

exports.getAllJobApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching job applications' });
  }
};
