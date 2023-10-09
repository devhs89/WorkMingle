const express = require("express");
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const logWithWinston = require("./src/util/winstonLogger");
try {
  const express = require('express');
  const authRoutes = require('./src/routes/authRoutes');

  const app = express();
  app.use(express.static('public'));

  const port = process.env.PORT || 3000;
  const mongoURI = process.env.MONGODB_URI;

  mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

// Middleware to handle authentication routes
  app.use('/api/auth', authRoutes);

  app.listen(port, function () {
    console.log(`App started on port http://localhost:${port}/`);
  });
} catch (e) {
  logWithWinston.error(e.message);
}