// routes/users.js

const router = require("express").Router();
const auth = require("../middlewares/auth");
const { validateUserUpdateBody } = require("../middlewares/validation");
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");

// Get current user info
router.get("/me", auth, getCurrentUser);

// Update current user info
router.patch("/me", auth, validateUserUpdateBody, updateCurrentUser);

module.exports = router;
