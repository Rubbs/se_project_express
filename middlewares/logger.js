// middlewares/logger.js

const winston = require("winston");
const expressWinston = require("express-winston");

// Request logger (logs every request)
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: "request.log" }), // saves to request.log
  ],
  format: winston.format.json(), // saves logs as JSON
});

// Error logger (logs errors only)
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: "error.log" }), // saves to error.log
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
