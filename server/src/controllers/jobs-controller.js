const JobAdvert = require("../models/job-advert");
const JobApplication = require("../models/job-application");
const fs = require("fs");

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

const showJob = async (req, res) => {
  try {
    const job = await JobAdvert.findById(req.body.id).exec();
    res.json(job);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
};

const applyJob = async (req, res) => {
  try {
    const userId = req.userId;
    const attachments = req.files;
    const {jobAdvertId, firstName, lastName} = req.body;

    if (!jobAdvertId || !firstName || !lastName) {
      return res.status(400).json({error: 'Missing required fields'});
    }

    if (!attachments) {
      return res.status(400).json({error: 'Missing attachments'});
    }

    const resume = attachments['resume'][0];
    const coverLetter = attachments['coverLetter'] ? attachments['coverLetter'][0] : null;

    if (!fs.existsSync(resume.path)) {
      return res.status(400).json({error: 'Missing resume'});
    }

    if (coverLetter && !fs.existsSync(coverLetter.path)) {
      return res.status(400).json({error: 'Missing cover letter'});
    }

    const job = await JobAdvert.findById(jobAdvertId).exec();
    if (!job) {
      return res.status(400).json({error: 'Job advert not found'});
    }

    const jobApplication = {
      jobAdvertId: jobAdvertId,
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      resume: resume.path,
      coverLetter: coverLetter ? coverLetter.path : null,
    };

    const result = await JobApplication.create(jobApplication);
    console.log(result);

    if (!result) {
      return res.status(400).json({message: 'Error creating job application'});
    }
    res.status(200).json({message: 'Job application submitted successfully'});
  } catch (error) {
    res.status(500).json({message: 'Error creating job application'});
  }
};

module.exports = {allJobs, searchJobs, showJob, applyJob};