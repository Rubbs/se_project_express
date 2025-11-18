const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  validateUserBody,
  validateAuthBody,
} = require("../middlewares/validation");
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");

// Get current user info
router.get("/me", auth, getCurrentUser);

// Update current user info (with validation)
router.patch("/me", auth, validateUserBody, updateCurrentUser);

router.get("/me", getCurrentUser);
router.patch("/me", updateCurrentUser);

module.exports = router;
