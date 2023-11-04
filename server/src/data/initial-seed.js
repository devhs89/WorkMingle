const AppRole = require('../models/app-role');
const AppRoles = require("../constants/app-roles");
const logWithWinston = require("../util/winston-logger");

// Seed application roles
const seedAppRoles = async () => {
  const roles = [AppRoles.admin, AppRoles.user, AppRoles.employer];

  try {
    const rolesCount = await AppRole.countDocuments({});
    if (+rolesCount > 0) {
      console.log('App roles already seeded');
      return;
    }

    // Delete all application roles
    await AppRole.deleteMany({});

    // Insert application roles
    await AppRole.insertMany(roles);

    console.log('App roles seeded successfully');
  } catch (e) {
    logWithWinston.error(e.message);
  }
};

module.exports = seedAppRoles;