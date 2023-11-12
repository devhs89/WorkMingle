const JobAdvert = require("../models/job-advert");

const allJobs = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const docCount = await JobAdvert.countDocuments({}).exec();
    const result = await JobAdvert.find({}, null, {limit: 5, skip: 5 * page}).exec();
    res.json({result, docCount});
  } catch (e) {
    res.status(500).json({message: e.message});
  }
};

const searchJobs = async (req, res) => {
  try {
    const {jobTitle, location, page} = req.body;
    const [results, totalCount] = await Promise.all([JobAdvert.find({$text: {$search: `${jobTitle} ${location}`}}, {score: {$meta: 'textScore'}})
      .sort({score: {$meta: 'textScore'}})
      .limit(5)
      .skip(5 * (page - 1))
      .exec(), JobAdvert.countDocuments({$text: {$search: `${jobTitle} ${location}`}}).exec()]);

    res.json({results, totalCount});
  } catch (e) {
    res.status(500).json({message: e.message});
  }
};

module.exports = {allJobs, searchJobs};