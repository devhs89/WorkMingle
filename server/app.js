// app.js
import express from 'express';
const app = express();
import { error, info } from './logging';

// ... other middleware setup ...

// Error handling middleware
app.use((err, req, res, next) => {
  error(`Error occurred: ${err.message}`);
  res.status(500).send('Internal Server Error');
});

// ... your routes and other app configuration ...

const port = process.env.PORT || 3000;
app.listen(port, () => {
  info(`Server is running on port ${port}`);
});
