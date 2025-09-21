const router = require("express").Router();
const clothingItemRouter = require("./clothingItem");
const userRouter = require("./users");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");

// Public routes
router.post("/signup", createUser);
router.post("/signin", login);

// Public items route
router.use("/items", clothingItemRouter);

// Protected routes
router.use(auth);
router.use("/users", userRouter);

module.exports = router;
