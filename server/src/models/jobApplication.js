const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobApplicationSchema = new Schema({
  resume: String,
  userId: {type: Schema.Types.String, ref: 'AppUser'},
  applicationDate: {  type: Date,  default: Date.now},
  attachments: [String],
  references: [String],
  status: [String]
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
