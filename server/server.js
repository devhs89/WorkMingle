const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(3000, function () {
  console.log('App started on port 3000');
});

app.get('/', (req, res) => {
  res.json({message: 'Hello, World!'});
});
