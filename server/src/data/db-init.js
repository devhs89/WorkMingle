const mongoose = require('mongoose');
const seedAppRoles = require("./initial-seed");
const logWithWinston = require("../util/winston-logger");
const ignore = require('dotenv').config();

const dbInit = async () => {
// Get the MongoDB URI
  const mongoURI = process.env.MONGODB_URI;

// Set up mongoose connection
  await mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

// Connection to MongoDB
  const db = mongoose.connection;

// On MongoDB connection error, log the error
  db.on('error', err => logWithWinston.error(err));

// On successful MongoDB connection, log the success message
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

  // Seed application roles
  await seedAppRoles();

  // Close the MongoDB connection
  db.close();

  // Return the database connection
  return db;
};

module.exports = dbInit;