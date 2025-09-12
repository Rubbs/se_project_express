const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

// crud

// create
router.post("/", createItem);

// Read

router.get("/", getItems);

// Delete

router.delete("/:itemId", deleteItem);

// like
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
