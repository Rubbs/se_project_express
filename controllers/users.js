<<<<<<< HEAD
// controllers/users.js
=======
>>>>>>> 226b1c7365d848fba859dc09d429a9d7eaa0d632
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

<<<<<<< HEAD
// Import custom error classes
const BadRequestError = require("../errors/BadRequestError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");

// Import status code constants
const { STATUS_OK, STATUS_CREATED } = require("../utils/constants");

// POST /signup – create a new user
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
=======
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
>>>>>>> 226b1c7365d848fba859dc09d429a9d7eaa0d632
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
<<<<<<< HEAD
        return next(new ConflictError("Email already exists"));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid user data"));
      }
      return next(err);
=======
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
>>>>>>> 226b1c7365d848fba859dc09d429a9d7eaa0d632
    });
};

// POST /signin – login user and return JWT
<<<<<<< HEAD
const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }

  return User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError("Invalid email or password");
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError("Invalid email or password");
        }
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        return res.send({ token });
      });
    })
    .catch((err) => next(err));
};

// GET /users/me – get current user
const getCurrentUser = (req, res, next) => {
=======
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
>>>>>>> 226b1c7365d848fba859dc09d429a9d7eaa0d632
  const userId = req.user && req.user._id;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
<<<<<<< HEAD
        throw new NotFoundError("User not found");
=======
        return res.status(STATUS_NOT_FOUND).send({ message: "User not found" });
>>>>>>> 226b1c7365d848fba859dc09d429a9d7eaa0d632
      }
      return res.status(STATUS_OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
<<<<<<< HEAD
        return next(new BadRequestError("Invalid user ID"));
      }
      return next(err);
=======
        return res
          .status(STATUS_BAD_REQUEST)
          .send({ message: "Invalid user ID" });
      }
      return res
        .status(STATUS_INTERNAL_ERROR)
        .send({ message: "An error occurred on the server" });
>>>>>>> 226b1c7365d848fba859dc09d429a9d7eaa0d632
    });
};

// PATCH /users/me – update profile
<<<<<<< HEAD
const updateCurrentUser = (req, res, next) => {
=======
const updateCurrentUser = (req, res) => {
>>>>>>> 226b1c7365d848fba859dc09d429a9d7eaa0d632
  const userId = req.user && req.user._id;
  const { name, avatar } = req.body;

  return User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true, context: "query" }
  )
    .then((user) => {
      if (!user) {
<<<<<<< HEAD
        throw new NotFoundError("User not found");
=======
        return res.status(STATUS_NOT_FOUND).send({ message: "User not found" });
>>>>>>> 226b1c7365d848fba859dc09d429a9d7eaa0d632
      }
      return res.status(STATUS_OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
<<<<<<< HEAD
        return next(new BadRequestError("Invalid user data"));
      }
      return next(err);
=======
        return res
          .status(STATUS_BAD_REQUEST)
          .send({ message: "Invalid user data" });
      }
      return res
        .status(STATUS_INTERNAL_ERROR)
        .send({ message: "An error occurred on the server" });
>>>>>>> 226b1c7365d848fba859dc09d429a9d7eaa0d632
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateCurrentUser,
};
