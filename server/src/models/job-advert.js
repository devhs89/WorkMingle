const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jobAdvertSchema = new Schema({
  title: {
    type: String, required: true
  }, company: {
    type: String, required: true
  }, location: {
    type: String, required: true
  }, description: {
    type: String, required: true
  }, salary: {
    type: String,
  }, employerId: {
    type: Schema.Types.ObjectId, ref: 'Employer',
  },
});

jobAdvertSchema.index({title: 'text', location: 'text'});
const JobAdvert = mongoose.model('JobAdvert', jobAdvertSchema, 'job-adverts');
module.exports = JobAdvert;