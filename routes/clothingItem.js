const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
  getItems,
} = require("../controllers/clothingItem");

const {
  validateCardBody,
  validateItemId,
} = require("../middlewares/validation");

// Get all items
router.get("/", getItems);

// Create item
router.post("/", auth, validateCardBody, createItem);

// Delete item
router.delete("/:itemId", auth, validateItemId, deleteItem);

// Like / Unlike
router.put("/:itemId/likes", auth, validateItemId, likeItem);
router.delete("/:itemId/likes", auth, validateItemId, dislikeItem);

module.exports = router;
