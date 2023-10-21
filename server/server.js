const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require("mongoose");
const jobApplicationRoutes = require('./src/routes/api');
const apiRoutes = require('./src/routes/api'); // Import the API routes

const logWithWinston = require("./src/util/winstonLogger");
try {
  app.use(express.static('public'));

  const port = process.env.PORT || 3000;
  const mongoURI = process.env.MONGODB_URI;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Enable CORS to allow cross-origin requests (adjust origin to your frontend URL)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // Replace with your Angular app URL
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
  mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

// Middleware to handle authentication routes

  app.listen(port, function () {
    console.log(`App started on port http://localhost:${port}/`);
  });
} catch (e) {
  logWithWinston.error(e.message);
}

app.use('/api', apiRoutes);
