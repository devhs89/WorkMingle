const express = require("express");
const ignore = require('dotenv').config();
const bodyParser = require('body-parser');
const logWithWinston = require("./src/util/winston-logger");
const dbInit = require('./src/data/db-init');
const authRoutes = require('./src/routes/authRoutes');

try {
  // Create a new Express application.
  const app = express();

  // Get the listening port
  const port = process.env.PORT || 3000;

  // Connect to MongoDB
  dbInit().then(() => {
    console.log('Database initialized');
  });

  // Serve static content for the app from the "public" directory.
  app.use(express.static('public'));

  // Parse request payload to JSON
  app.use(bodyParser.json());

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