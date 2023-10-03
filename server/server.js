const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.static('public'));

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

app.listen(port, function(){
    console.log('App started on port '+port);
});
app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
});
