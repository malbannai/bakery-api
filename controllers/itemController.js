const { Data } = require("../db/models");

exports.myList = async (req, res) => {
  try {
    const data = await Data.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete
exports.deleteItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    const foundItem = await Data.findByPk(itemId);
    if (foundItem) {
      await foundItem.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};

//Create
exports.createItem = async (req, res) => {
  try {
    const newItem = await Data.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update
exports.updateItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    const foundItem = await Data.findByPk(itemId);
    if (foundItem) {
      await foundItem.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
