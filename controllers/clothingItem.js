const clothingItem = require("../models/clothingItem");

// Import your custom error classes
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

const { STATUS_OK, STATUS_CREATED } = require("../utils/constants");

// Create a clothing item
const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(STATUS_CREATED).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid item data"));
      }
      return next(err);
    });
};

// Get all clothing items
const getItems = (req, res, next) => {
  clothingItem
    .find({})
    .then((items) => res.status(STATUS_OK).send(items))
    .catch((err) => next(err));
};

// Delete a clothing item (with ownership check)
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  clothingItem
    .findById(itemId)
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => {
      // Check ownership
      if (item.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError(
          "You do not have permission to delete this item"
        );
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
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      return next(err);
    });
};

// Like a clothing item
const likeItem = (req, res, next) => {
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
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      return next(err);
    });
};

// Dislike a clothing item
const dislikeItem = (req, res, next) => {
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
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      return next(err);
    });
};

module.exports = { createItem, getItems, deleteItem, likeItem, dislikeItem };
