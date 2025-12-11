// app.js
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

<<<<<<< HEAD
const routes = require("./routes");
=======
const routes = require("./routes"); // central index.js router
const { STATUS_NOT_FOUND } = require("./utils/constants");

>>>>>>> 3e8163efb328515f36c008c5f2799003bdfe169d
const NotFoundError = require("./errors/NotFoundError");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
app.disable("x-powered-by");
const { PORT = 3001 } = process.env;

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Error connecting to DB", err);
  });

// Middleware
app.use(cors());
app.use(express.json());
<<<<<<< HEAD
app.use(requestLogger);
=======
app.use(requestLogger); // Log all requests
>>>>>>> 3e8163efb328515f36c008c5f2799003bdfe169d

// Crash test route
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// Main routes
app.use(routes);

<<<<<<< HEAD
// Logging errors (after routes)
app.use(errorLogger);

// Handle undefined routes
=======
app.use(errorLogger); // Log all errors
// Handler for undefined routes
>>>>>>> 3e8163efb328515f36c008c5f2799003bdfe169d
app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

// Celebrate validation errors
app.use(errors());

// Centralized error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
