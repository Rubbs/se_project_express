const clothingItem = require("../models/clothingItem");

// Create a clothing item
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send({ data: item }))
    .catch((e) =>
      res.status(500).send({ message: "Error from createItem", e })
    );
};

// Get all clothing items
const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => res.status(500).send({ message: "Error from getItems", e }));
};

// Update an item's imageUrl
const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  clothingItem
    .findByIdAndUpdate(itemId, { $set: { imageUrl } }, { new: true })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) =>
      res.status(500).send({ message: "Error from updateItem", e })
    );
};

// Delete a clothing item
const deleteItem = (req, res) => {
  const { itemId } = req.params;

  clothingItem
    .findByIdAndDelete(itemId)
    .orFail()
    .then(() => res.status(204).send())
    .catch((e) =>
      res.status(500).send({ message: "Error from deleteItem", e })
    );
};

module.exports = { createItem, getItems, updateItem, deleteItem };
