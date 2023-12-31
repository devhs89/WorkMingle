const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppUserSchema = new Schema({
  email: {
    type: String, required: true, unique: true,
  }, password: {
    type: String, required: true,
  }, firstName: {
    type: String, required: true
  }, lastName: {
    type: String, required: true
  }, country: {
    type: String, required: true
  }, state: {
    type: String
  }, city: {
    type: String
  }, postcode: {
    type: String,
  }, memberId: {
    type: String, unique: true, sparse: true
  }, activeMember: {
    type: Boolean, default: false, required: true
  }, termsAndConditions: {
    type: String, required: true, pattern: 'true'
  }, roles: [{type: Schema.Types.String, ref: 'AppRole'}],
});

const AppUser = mongoose.model('AppUser', AppUserSchema);
module.exports = AppUser;