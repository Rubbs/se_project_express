const clothingItem = require("../models/clothingItem");

<<<<<<< HEAD
// Import your custom error classes
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

const { STATUS_OK, STATUS_CREATED } = require("../utils/constants");

// Create a clothing item
const createItem = (req, res, next) => {
=======
const {
  STATUS_OK,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_ERROR,
  STATUS_FORBIDDEN,
} = require("../utils/constants");

// Create a clothing item
const createItem = (req, res) => {
>>>>>>> 226b1c7365d848fba859dc09d429a9d7eaa0d632
  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner: req.user._id })
<<<<<<< HEAD
    .then((item) => res.status(STATUS_CREATED).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid item data"));
      }
      return next(err);
=======
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
>>>>>>> 226b1c7365d848fba859dc09d429a9d7eaa0d632
    });
};

// Get all clothing items
<<<<<<< HEAD
const getItems = (req, res, next) => {
  clothingItem
    .find({})
    .then((items) => res.status(STATUS_OK).send(items))
    .catch((err) => next(err));
};

// Delete a clothing item (with ownership check)
const deleteItem = (req, res, next) => {
=======
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
>>>>>>> 226b1c7365d848fba859dc09d429a9d7eaa0d632
  const { itemId } = req.params;

  clothingItem
    .findById(itemId)
<<<<<<< HEAD
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => {
      // Check ownership
      if (item.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError(
          "You do not have permission to delete this item"
        );
=======
    .orFail()
    .then((item) => {
      // Check ownership
      if (item.owner.toString() !== req.user._id) {
        return res
          .status(STATUS_FORBIDDEN)
          .send({ message: "You can only delete your own items" });
>>>>>>> 226b1c7365d848fba859dc09d429a9d7eaa0d632
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
<<<<<<< HEAD
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      return next(err);
=======
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
>>>>>>> 226b1c7365d848fba859dc09d429a9d7eaa0d632
    });
};

// Like a clothing item
<<<<<<< HEAD
const likeItem = (req, res, next) => {
=======
const likeItem = (req, res) => {
>>>>>>> 226b1c7365d848fba859dc09d429a9d7eaa0d632
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
<<<<<<< HEAD
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      return next(err);
=======
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
>>>>>>> 226b1c7365d848fba859dc09d429a9d7eaa0d632
    });
};

// Dislike a clothing item
<<<<<<< HEAD
const dislikeItem = (req, res, next) => {
=======
const dislikeItem = (req, res) => {
>>>>>>> 226b1c7365d848fba859dc09d429a9d7eaa0d632
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
<<<<<<< HEAD
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      return next(err);
=======
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
>>>>>>> 226b1c7365d848fba859dc09d429a9d7eaa0d632
    });
};

module.exports = { createItem, getItems, deleteItem, likeItem, dislikeItem };
