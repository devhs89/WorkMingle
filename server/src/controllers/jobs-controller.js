const JobAdvert = require("../models/job-advert");

const allJobs = async (req, res) => {
  try {
    const result = await JobAdvert.find({}).exec();
    res.json(result);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
};

const searchJobs = async (req, res) => {
  try {
    const {jobTitle, location} = req.body;

    const result = await JobAdvert.find({
      $text: {
        $search: `${jobTitle} ${location}`,
      },
    }, {score: {$meta: 'textScore'}}).sort({score: {$meta: 'textScore'}});

    res.json(result);
  } catch (e) {
    // Handle errors
    console.error('Error searching jobs:', e);
    res.status(500).json({message: e.message});
  }
};


module.exports = {allJobs, searchJobs};