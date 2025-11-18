// routes/clothingItem.js
const router = require("express").Router();

const {
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
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

module.exports = router;

