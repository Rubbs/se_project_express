// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const routes = require("./routes"); // central index.js router
const { STATUS_NOT_FOUND } = require("./utils/constants");

const NotFoundError = require("./errors/NotFoundError");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3001 } = process.env;

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB"); // eslint-disable-line no-console
  })
  .catch((err) => {
    console.error("Error connecting to DB", err); // eslint-disable-line no-console
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger); // Log all requests

// Use all routes (index.js will decide which are public/protected)
app.use(routes);

app.use(errorLogger); // Log all errors
// Handler for undefined routes
app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

// Celebrate error handler
app.use(errors());

// Centralized error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`); // eslint-disable-line no-console
});
