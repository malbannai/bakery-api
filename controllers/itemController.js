const { Data } = require("../db/models");

//Update and Delete are soooo similar, so we will use that as an advantage
exports.fetchItem = async (itemId, next) => {
  try {
    const foundItem = await Data.findByPk(itemId);
    return foundItem;
  } catch (error) {
    next(error);
  }
};

exports.myList = async (req, res, next) => {
  try {
    const data = await Data.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(data);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

//Delete
exports.deleteItem = async (req, res, next) => {
  try {
    await req.foundItem.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

//Create
exports.createItem = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newItem = await Data.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

//Update
exports.updateItem = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.foundItem.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};
