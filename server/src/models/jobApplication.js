const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  resume: String,
  userId: {type: Object.Schema.Id, ref: 'AppUser'},
  applicationDate: {  type: Date,  default: Date.now},
  attachments: [String],
  references: [String],
  status: String
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
