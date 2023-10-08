const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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

// Middleware to handle unhandled routes
app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(port, function () {
  console.log(`App started on port http://localhost:${port}/`);
});
