const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const {
  STATUS_OK,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_ERROR,
  STATUS_CONFLICT,
  STATUS_UNAUTHORIZED,
} = require("../utils/constants");

// POST /signup – create a new user
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  if (!email || !password) {
    return res
      .status(STATUS_BAD_REQUEST)
      .send({ message: "Email and password are required" });
  }

  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      return res.status(STATUS_CREATED).send({ data: userObj });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res
          .status(STATUS_CONFLICT)
          .send({ message: "Email already exists" });
      }
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

// POST /signin – login user and return JWT
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(STATUS_BAD_REQUEST)
      .send({ message: "Email and password are required" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch(() =>
      res
        .status(STATUS_UNAUTHORIZED)
        .send({ message: "Incorrect email or password" })
    );
};

// GET /users/me – get current user
const getCurrentUser = (req, res) => {
  const userId = req.user && req.user._id;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(STATUS_NOT_FOUND).send({ message: "User not found" });
      }
      return res.status(STATUS_OK).send({ data: user });
    })
    .catch((err) => {
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

// PATCH /users/me – update profile
const updateCurrentUser = (req, res) => {
  const userId = req.user && req.user._id;
  const { name, avatar } = req.body;

  return User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true, context: "query" }
  )
    .then((user) => {
      if (!user) {
        return res.status(STATUS_NOT_FOUND).send({ message: "User not found" });
      }
      return res.status(STATUS_OK).send({ data: user });
    })
    .catch((err) => {
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

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateCurrentUser,
};
