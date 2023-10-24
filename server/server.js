const express = require("express");
const ignore = require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const logWithWinston = require("./src/util/winstonLogger");
const authRoutes = require('./src/routes/authRoutes');

try {
  // Create a new Express application.
  const app = express();

  // Serve static content for the app from the "public" directory.
  app.use(express.static('public'));

  // Get the listening port
  const port = process.env.PORT || 3000;

  // Get the MongoDB URI
  const mongoURI = process.env.MONGODB_URI;

  // Parse request payload to JSON
  app.use(bodyParser.json());

  // Set up mongoose connection
  mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

  // Connection to MongoDB
  const db = mongoose.connection;

  // On MongoDB connection error, log the error
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  // On successful MongoDB connection, log the success message
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

  // Add authentication middleware to handle authentication routes
  app.use('/api/auth', authRoutes);

  // Start server on the specified port
  app.listen(port, function () {
    console.log(`App started on port http://localhost:${port}/`);
  });
} catch (e) {
  // Log any exceptions
  logWithWinston.error(e.message);
}