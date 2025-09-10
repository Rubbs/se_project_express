const router = require("express").Router();
const { getUsers, createUser, getUser } = require("../controllers/users");

// GET /users - get all users
router.get("/", getUsers);

// GET /users/:userId - get user by ID
router.get("/:userId", getUser);

// POST /users - create a new user
router.post("/", createUser);

module.exports = router;
