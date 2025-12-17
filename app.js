// app.js
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const routes = require("./routes");
const NotFoundError = require("./errors/NotFoundError");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
app.disable("x-powered-by");
const { PORT = 3001 } = process.env;

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

// Middleware
app.use(
  cors({
    origin: [
      "https://appwtwr.jumpingcrab.com",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// IMPORTANT: allow preflight requests
app.options("*", cors());

app.use(express.json());
app.use(requestLogger);

// Crash test route
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// Main routes
app.use(routes);

// Logging errors (after routes)
app.use(errorLogger);

// Celebrate validation errors
app.use(errors());

// Handle undefined routes
app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

// Centralized error handler
app.use(errorHandler);

// Start server
app.listen(PORT);
