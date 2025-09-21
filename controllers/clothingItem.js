const clothingItem = require("../models/clothingItem");

const {
  STATUS_OK,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_ERROR,
} = require("../utils/constants");

// Create a clothing item
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(STATUS_CREATED).send({ data: item }))
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      if (err.name === "ValidationError") {
        return res.status(STATUS_BAD_REQUEST).send({
          message: "Invalid input data",
        });
      }
      return res.status(STATUS_INTERNAL_ERROR).send({
        message: "Internal server error",
      });
    });
};

// Get all clothing items
const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.status(STATUS_OK).send({ data: items }))
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      return res
        .status(STATUS_INTERNAL_ERROR)
        .send({ message: "Error fetching items" });
    });
};

// Delete a clothing item (with ownership check)
const deleteItem = (req, res) => {
  const { itemId } = req.params;

  clothingItem
    .findById(itemId)
    .orFail()
    .then((item) => {
      // Check ownership
      if (item.owner.toString() !== req.user._id) {
        return res
          .status(403)
          .send({ message: "You can only delete your own items" });
      }

      // If owner matches, delete
      return clothingItem.findByIdAndDelete(itemId).then((deletedItem) =>
        res.status(STATUS_OK).send({
          message: "Item successfully deleted",
          data: deletedItem,
        })
      );
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      if (err.name === "CastError") {
        return res
          .status(STATUS_BAD_REQUEST)
          .send({ message: "Invalid item ID format" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(STATUS_NOT_FOUND).send({ message: "Item not found" });
      }
      return res
        .status(STATUS_INTERNAL_ERROR)
        .send({ message: "Internal server error" });
    });
};

// Like a clothing item
const likeItem = (req, res) => {
  const { itemId } = req.params;

  clothingItem
    .findByIdAndUpdate(
      itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) =>
      res.status(STATUS_OK).send({ message: "Item liked", data: item })
    )
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      if (err.name === "CastError") {
        return res
          .status(STATUS_BAD_REQUEST)
          .send({ message: "Invalid item ID format" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(STATUS_NOT_FOUND).send({ message: "Item not found" });
      }
      return res
        .status(STATUS_INTERNAL_ERROR)
        .send({ message: "Internal server error" });
    });
};

// Dislike a clothing item
const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  clothingItem
    .findByIdAndUpdate(
      itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) =>
      res.status(STATUS_OK).send({ message: "Item disliked", data: item })
    )
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      if (err.name === "CastError") {
        return res
          .status(STATUS_BAD_REQUEST)
          .send({ message: "Invalid item ID format" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(STATUS_NOT_FOUND).send({ message: "Item not found" });
      }
      return res
        .status(STATUS_INTERNAL_ERROR)
        .send({ message: "Internal server error" });
    });
};

module.exports = { createItem, getItems, deleteItem, likeItem, dislikeItem };
