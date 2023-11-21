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
  }, datePosted: {
    type: String, required: true, regexp: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/
  }, dateExpires: {
    type: String, required: true, regexp: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/
  }, jobType: {
    type: String,
    required: true,
    enum: ['full-time', 'part-time', 'contract', 'temporary', 'internship', 'co-op', 'volunteer', 'seasonal', 'other']
  }, industry: {
    type: String,
    required: true,
    enum: ['accounting', 'administration', 'advertising', 'agriculture', 'automotive', 'banking', 'biotechnology', 'business', 'construction', 'customer service', 'design', 'distribution', 'education', 'electronics', 'energy', 'engineering', 'facilities', 'finance', 'food services', 'government', 'healthcare', 'hospitality', 'human resources', 'information technology', 'insurance', 'inventory', 'legal', 'logistics', 'management', 'manufacturing', 'marketing', 'media', 'nursing', 'operations', 'pharmaceutical', 'production', 'project management', 'public relations', 'purchasing', 'quality assurance', 'real estate', 'research', 'retail', 'sales', 'science', 'security', 'skilled trade', 'social services', 'strategy', 'supply chain', 'telecommunications', 'training', 'transportation', 'utilities', 'warehouse', 'other']
  }, availablePositions: {
    type: Number, required: true
  }, experience: {
    type: String, required: true, enum: ['none', 'entry', 'intermediate', 'senior', 'executive']
  }, education: {
    type: String, enum: ['none', 'high school', 'college', 'university']
  }, skills: {
    type: [String]
  }, salary: {
    type: String,
  }, employerId: {
    type: Schema.Types.ObjectId, ref: 'Employer',
  },
});

jobAdvertSchema.index({title: 'text'});
const JobAdvert = mongoose.model('JobAdvert', jobAdvertSchema, 'job-adverts');
module.exports = JobAdvert;