const mongoose = require('mongoose');
const appRoles = require("../constants/app-roles");
const Schema = mongoose.Schema;
const AppRoleSchema = new Schema({
  name: {
    type: String, required: true, unique: true,
  }, normalizedName: {
    type: String, required: true, unique: true, enum: Object.values(appRoles).map(role => role.normalizedName)
  },
});

const AppRole = mongoose.model('AppRole', AppRoleSchema);
module.exports = AppRole;
