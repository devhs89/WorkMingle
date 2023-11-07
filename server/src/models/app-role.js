const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AppRoleSchema = new Schema({
  name: {
    type: String, required: true, unique: true,
  }, normalizedName: {
    type: String, required: true, unique: true, enum: ['ADMIN', 'USER', 'EMPLOYER']
  },
});

const AppRole = mongoose.model('AppRole', AppRoleSchema);
module.exports = AppRole;
