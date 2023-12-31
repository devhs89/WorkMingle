const winston = require('winston');
const {createLogger, transports, format} = winston;

// Configure the Winston logger
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({filename: 'logs/application.log'}),
  ],
});

module.exports = logger;
