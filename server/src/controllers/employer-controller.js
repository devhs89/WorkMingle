const Employer = require("../models/employer");
const JobAdvert = require("../models/job-advert");

const postedJobs = async (req, res) => {
  try {
    const userId = req.userId;
    let {sortColumn, sortDir, pageLimit, pageIndex} = req.body;

    if (!sortColumn || !sortDir || !pageLimit || pageIndex < 0) return res.status(400).json({message: "Missing required parameters"});
    sortColumn = ['title', 'location', 'jobType', 'availablePositions', 'dateExpires'].includes(sortColumn) ? sortColumn : 'datePosted';
    sortDir = ['asc', 'desc'].includes(sortDir) ? sortDir : 'desc';
    pageLimit = [5, 10, 25, 50].includes(pageLimit) ? pageLimit : 10;

    const employer = await Employer.findOne({userId: userId}).exec();
    if (!employer) return res.status(404).json({message: "Employer not found"});

    const jobPosts = await JobAdvert.find({employerId: employer._id}, null, {
      skip: pageIndex * pageLimit, limit: pageLimit
    }).sort({[sortColumn]: sortDir}).exec();
    const totalJobPosts = await JobAdvert.countDocuments({employerId: employer._id}).exec();
    return res.status(200).json({docCount: totalJobPosts, results: jobPosts});
  } catch (e) {
    res.status(500).json({message: e.message});
  }
};

const postJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      description,
      datePosted,
      dateExpires,
      jobType,
      industry,
      vacancies,
      experience,
      education,
      skills,
      salary
    } = req.body;
    const userId = req.userId;

    const employer = await Employer.findOne({userId: userId}).exec();
    if (!employer) return res.status(404).json({message: "Employer not found"});

    const jobPostExists = await JobAdvert.findOne({
      title: title,
      company: company,
      location: location,
      jobType: jobType,
      industry: industry,
      experience: experience,
      employerId: employer._id
    }).exec();
    if (jobPostExists) return res.status(400).json({message: "Job post already exists"});

    const jobPost = await JobAdvert.create({
      title,
      company,
      location,
      description,
      datePosted,
      dateExpires,
      jobType,
      industry,
      vacancies,
      experience,
      education,
      skills,
      salary,
      employerId: employer._id
    });
    return res.status(200).json(jobPost);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
};

const updateJob = async (req, res) => {
  try {
    const detailsToUpdate = req.body;
    const userId = req.userId;

    if (!detailsToUpdate._id) return res.status(400).json({message: "Job post ID is required"});

    const employer = await Employer.findOne({userId: userId}).exec();
    if (!employer) return res.status(404).json({message: "Employer not found"});

    const jobPost = await JobAdvert.findById(detailsToUpdate._id).exec();
    if (!jobPost) return res.status(404).json({message: "Job post not found"});

    const updatedJobPost = await JobAdvert.findOneAndUpdate(jobPost._id, detailsToUpdate, {new: true}).exec();
    return res.status(200).json(updatedJobPost);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
};

const deleteJob = async (req, res) => {
  try {
    const _id = req.body.jobAdvertId;
    if (!_id) return res.status(400).json({message: "Job post ID is required"});

    const jobPost = await JobAdvert.findById(_id).exec();
    if (!jobPost) return res.status(404).json({message: "Job post not found"});

    await JobAdvert.deleteOne(jobPost._id).exec();
    return res.status(200).json({message: "Job post deleted successfully"});
  } catch (e) {
    res.status(500).json({message: e.message});
  }
};

module.exports = {postedJobs, postJob, updateJob, deleteJob};