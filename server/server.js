const express = require("express");
const path = require("path");
const ignore = require('dotenv').config({path: path.join(__dirname, '.env')});
const bodyParser = require('body-parser');
const logWithWinston = require("./src/util/winston-logger");
const dbInit = require('./src/data/db-init');
const apiRoutes = require('./src/routes/api-routes');

// Create a new Express application.
const app = express();

// Get the environment
const env = process.env.NODE_ENV;
if (!env || new RegExp('^(production|development|test)$').test(env) === false) {
  throw new Error('NODE_ENV must be set to either \"production\", \"development\" or \"test\".');
}

// Get the listening port
const port = process.env.PORT || 3000;

// Serve static content for the app from the "public" directory.
app.use(express.static('public'));
app.use(express.static('wwwroot'));

// Parse request payload to JSON
app.use(bodyParser.json());

// Parse request payload to URL encoded data
app.use(bodyParser.urlencoded({extended: true}));

try {
  // Connect to MongoDB
  dbInit().then((db) => console.log(`Database connected on ${db.port}`));

  // Add authentication middleware to handle authentication routes
  app.use('/api', apiRoutes);

  // Pass any other requests to the index.html page of the client
  app.get('*', (req, res) => {
    res.sendFile(__dirname + '/wwwroot/index.html');
  });
} catch (e) {
  // Log any exceptions
  console.log(e.message);
  logWithWinston.error(e.message);
}

// Start server on the specified port
app.listen(port, function () {
  console.log(`App started on port http://localhost:${port}/`);
});
