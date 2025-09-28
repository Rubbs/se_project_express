const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes"); // central index.js router
const { STATUS_NOT_FOUND } = require("./utils/constants");

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

// Use all routes (index.js will decide which are public/protected)
app.use(routes);

// Handler for undefined routes
app.use((req, res) => {
  res
    .status(STATUS_NOT_FOUND)
    .send({ message: "Requested resource not found" });
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`); // eslint-disable-line no-console
});
