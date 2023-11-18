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

    let results = [];
    let docCount = 0;

    if (jobTitle && location) {
      // Get total document count
      docCount = await JobAdvert.countDocuments({
        $text: {
          $search: jobTitle, $caseSensitive: false
        }
      }).where("location").regex(new RegExp(location, "i")).exec();
      // Search by job title and location
      results = await JobAdvert.find({
        $text: {
          $search: jobTitle, $caseSensitive: false
        }
      }).where("location").regex(new RegExp(location, "i")).sort({score: {$meta: "textScore"}})
        .limit(limit).skip(docCount > (limit * page) ? limit * page : 0).exec();
    } else if (jobTitle) {
      // Get total document count
      docCount = await JobAdvert.countDocuments({
        $text: {
          $search: jobTitle, $caseSensitive: false
        }
      }).exec();
      // Search by job title
      results = await JobAdvert.find({
        $text: {
          $search: jobTitle, $caseSensitive: false
        }
      }).sort({score: {$meta: "textScore"}}).limit(limit)
        .skip(docCount > (limit * page) ? limit * page : 0).exec();
    } else if (location) {
      // Get total document count
      docCount = await JobAdvert.countDocuments({location: {$regex: new RegExp(location, "i")}}).exec();
      // Search by location
      results = await JobAdvert.find({location: {$regex: new RegExp(location, "i")}})
        .sort({location: -1}).limit(limit).skip(docCount > (limit * page) ? limit * page : 0).exec();
    } else {
      // No search parameters, return all jobs
      return await allJobs(req, res);
    }
    // Return results and document count except when in "else" block
    return res.json({results, docCount});
  } catch (e) {
    res.status(500).json({message: e.message});
  }
};

module.exports = {allJobs, searchJobs};