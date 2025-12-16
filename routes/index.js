// routes/index.js

const router = require("express").Router();

const clothingItemRouter = require("./clothingItem");
const userRouter = require("./users");

const { createUser, login } = require("../controllers/users");
const {
  validateUserBody,
  validateAuthBody,
} = require("../middlewares/validation");
const { getItems } = require("../controllers/clothingItem");

// Crash-test route (REQUIRED for Project 15)
router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// Public auth routes
router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateAuthBody, login);

// Public GET /items
router.get("/items", getItems);

// Protected routes

router.use("/items", clothingItemRouter);
router.use("/users", userRouter);

module.exports = router;
