const router = require("express").Router();
const clothingItemRouter = require("./clothingItem");
const userRouter = require("./users");

router.use("/items", clothingItemRouter);

router.use("/users", userRouter);

module.exports = router;
