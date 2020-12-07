const { Bakery, Data } = require("../db/models");

exports.fetchBakery = async (bakeryId, next) => {
  try {
    const foundBakery = await Bakery.findByPk(bakeryId);
    return foundBakery;
  } catch (error) {
    next(error);
  }
};

exports.myBakeryList = async (req, res, next) => {
  try {
    let data = await Bakery.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: Data,
          as: "items",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });

    if (req.params.bakeryId) {
      const { bakeryId } = req.params;
      const wantedBakery = data.filter((bakery) => bakeryId == bakery.id);
      data = wantedBakery;
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
};

//Create
exports.createBakery = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newItem = await Bakery.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};
