// app.js
const express = require('express');
const app = express();
const logger = require('./logging');

// ... other middleware setup ...

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Error occurred: ${err.message}`);
  res.status(500).send('Internal Server Error');
});

// ... your routes and other app configuration ...

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
