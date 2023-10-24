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
        type: String
    }, termsAndConditions: {
        type: String, required: true, pattern: 'true'
    }
});

module.exports = mongoose.model('AppUser', AppUserSchema);