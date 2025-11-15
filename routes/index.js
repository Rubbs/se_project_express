const router = require("express").Router();
const clothingItemRouter = require("./clothingItem");
const userRouter = require("./users");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { getItems } = require("../controllers/clothingItem");

// Public routes
router.post("/signup", createUser);
router.post("/signin", login);

// Public items route
router.get("/items", getItems);

// Protected routes
router.use(auth);
router.use("/items", clothingItemRouter);
router.use("/users", userRouter);

module.exports = router;
