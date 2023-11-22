const express = require("express");
const ignore = require('dotenv').config();
const bodyParser = require('body-parser');
const logWithWinston = require("./src/util/winston-logger");
const dbInit = require('./src/data/db-init');
const apiRoutes = require('./src/routes/api-routes');

try {
  // Create a new Express application.
  const app = express();

  // Get the listening port
  const port = process.env.PORT || 3000;

  // Connect to MongoDB
  dbInit().then((db) => console.log(`Database connected on ${db.port}`));

  // Serve static content for the app from the "public" directory.
  app.use(express.static('public'));

  // Parse request payload to JSON
  app.use(bodyParser.json());

  // Parse request payload to URL encoded data
  app.use(bodyParser.urlencoded({extended: true}));

  // Add authentication middleware to handle authentication routes
  app.use('/api', apiRoutes);

  // Start server on the specified port
  app.listen(port, function () {
    console.log(`App started on port http://localhost:${port}/`);
  });
} catch (e) {
  // Log any exceptions
  logWithWinston.error(e.message);
}