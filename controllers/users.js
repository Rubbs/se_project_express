const User = require("../models/user");

const {
  STATUS_OK,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_ERROR,
} = require("../utils/constants");

// Get all users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(STATUS_OK).send({ data: users }))
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      return res
        .status(STATUS_INTERNAL_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};

// POST /user - create a new user
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(STATUS_CREATED).send({ data: user }))
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      if (err.name === "ValidationError") {
        return res
          .status(STATUS_BAD_REQUEST)
          .send({ message: "Invalid user data" });
      }
      return res
        .status(STATUS_INTERNAL_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};

// Get user by ID
const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(STATUS_OK).send({ data: user }))
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      if (err.name === "DocumentNotFoundError") {
        return res.status(STATUS_NOT_FOUND).send({ message: "User not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(STATUS_BAD_REQUEST)
          .send({ message: "Invalid user ID" });
      }

      return res
        .status(STATUS_INTERNAL_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};

module.exports = { getUsers, createUser, getUser };
