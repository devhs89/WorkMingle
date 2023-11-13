const JobAdvert = require("../models/job-advert");

const allJobs = async (req, res) => {
  try {
    const page = req.body.page ? req.body.page : 0;
    const limit = [5, 10, 25, 50].includes(req.body.limit) ? req.body.limit : 5;
    const docCount = await JobAdvert.countDocuments({}).exec();
    const results = await JobAdvert.find({}, null, {limit: limit, skip: limit * page}).exec();
    res.json({results, docCount});
  } catch (e) {
    res.status(500).json({message: e.message});
  }
};

const searchJobs = async (req, res) => {
  try {
    const {jobTitle, location} = req.body;
    const page = req.body.page ? req.body.page : 0;
    const limit = [5, 10, 25, 50].includes(req.body.limit) ? req.body.limit : 5;
    const [results, docCount] = await Promise.all([JobAdvert.find({$text: {$search: `${jobTitle} ${location}`}}, {score: {$meta: 'textScore'}})
      .sort({score: {$meta: 'textScore'}})
      .limit(limit)
      .skip(limit * page)
      .exec(), JobAdvert.countDocuments({$text: {$search: `${jobTitle} ${location}`}}).exec()]);
    res.json({results, docCount});
  } catch (e) {
    res.status(500).json({message: e.message});
  }
};

module.exports = {allJobs, searchJobs};