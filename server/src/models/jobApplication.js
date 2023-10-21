const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  resume: String,
  
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
