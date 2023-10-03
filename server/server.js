const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.static('public'));

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

app.listen(port, function(){
    console.log('App started on port '+port);
});

const mongoose = require('mongoose');

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

