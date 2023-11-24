const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employerSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'AppUser', unique: true},
  businessName: {type: String, required: true, unique: true},
  industry: {type: String, required: true},
  streetAddress: {type: String, required: true},
  city: {type: String, required: true},
  postalCode: {type: String, required: true},
  country: {type: String, required: true},
  website: {type: String, pattern: 'https?://.+'},
  workEmail: {type: String, required: true, unique: true},
  workPhone: {type: String},
  description: {type: String},
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],

});
const Employer = mongoose.model('Employer', employerSchema);
module.exports = Employer;