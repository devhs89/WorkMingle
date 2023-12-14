const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobApplicationSchema = new Schema({
  applicationDate: {type: Date, default: Date.now},
  status: {type: String, required: true, enum: ['Submitted', 'Reviewed', 'Accepted', 'Rejected'], default: 'Submitted'},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  resume: {type: String, required: true},
  coverLetter: {type: String},
  references: [String],
  jobAdvertId: {type: Schema.Types.ObjectId, ref: 'JobAdvert'},
  userId: {type: Schema.Types.ObjectId, ref: 'AppUser'}
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema, 'job-applications');
module.exports = JobApplication;