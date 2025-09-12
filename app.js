const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/users");
const clothingItemRouter = require("./routes/clothingItem");
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

// Middleware to parse JSON
app.use(express.json());

// Temporary authorization middleware
app.use((req, res, next) => {
  req.user = {
    _id: "68bf8fd97598460b846b20d2", // Example user ID
  };
  next();
});

// Mount router
app.use("/users", mainRouter);
app.use("/items", clothingItemRouter);

//  handler for undefined routes
app.use((req, res) => {
  res
    .status(STATUS_NOT_FOUND)
    .send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`); // eslint-disable-line no-console
});
