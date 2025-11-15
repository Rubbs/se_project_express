<<<<<<< HEAD
// routes/clothingItem.js
=======
>>>>>>> 226b1c7365d848fba859dc09d429a9d7eaa0d632
const router = require("express").Router();

const {
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
<<<<<<< HEAD
  getItems,
} = require("../controllers/clothingItem");

const auth = require("../middlewares/auth");
const {
  validateCardBody,
  validateItemId,
} = require("../middlewares/validation");

// crud

// Get all items
router.get("/", getItems);

// create
router.post("/", auth, validateItemId, createItem);

// Delete

router.delete("/:itemId", auth, validateItemId, deleteItem);

// like
router.put("/:itemId/likes", auth, validateItemId, likeItem);
router.delete("/:itemId/likes", auth, validateItemId, dislikeItem);
=======
} = require("../controllers/clothingItem");

// crud

// create
router.post("/", createItem);

// Delete

router.delete("/:itemId", deleteItem);

// like
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);
>>>>>>> 226b1c7365d848fba859dc09d429a9d7eaa0d632

module.exports = router;
