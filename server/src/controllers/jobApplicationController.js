const JobApplication = require('../models/jobApplication');

exports.createJobApplication = async (req, res) => {
  const { name, email, resume } = req.body;
  const newApplication = new JobApplication({ name, email, resume });

  try {
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(500).json({ error: 'Error creating job application' });
  }
};

exports.getAllJobApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching job applications' });
  }
};
