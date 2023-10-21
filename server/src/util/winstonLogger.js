const winston = require('winston');
const winstonDailyRotateFile = require('winston-daily-rotate-file');
const path = require("path");
const {combine, timestamp, json} = winston.format;

const errorDailyRotateFile = new winstonDailyRotateFile({
  frequency: '1d',
  filename: path.join(require.main.path, 'logs', 'error-workmingle-%DATE%.log'),
  level: 'error',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '30d'
});

const warnDailyRotateFile = new winstonDailyRotateFile({
  frequency: '1d',
  filename: path.join(require.main.path, 'logs', 'warn-workmingle-%DATE%.log'),
  level: 'warn',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '30d'
});

const infoDailyRotateFile = new winstonDailyRotateFile({
  frequency: '1d',
  filename: path.join(require.main.path, 'logs', 'info-workmingle-%DATE%.log'),
  level: 'info',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '30d'
});

const combinedDailyRotateFile = new winstonDailyRotateFile({
  frequency: '1d',
  filename: path.join(require.main.path, 'logs', 'combined-workmingle-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '30d'
});

const logWithWinston = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [errorDailyRotateFile, warnDailyRotateFile, infoDailyRotateFile, combinedDailyRotateFile]
});

module.exports = logWithWinston;