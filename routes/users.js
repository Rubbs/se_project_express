const router = require("express").Router();
<<<<<<< HEAD
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
=======
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");

router.get("/me", getCurrentUser);
router.patch("/me", updateCurrentUser);
>>>>>>> 226b1c7365d848fba859dc09d429a9d7eaa0d632

module.exports = router;
