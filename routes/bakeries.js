const express = require("express");
const router = express.Router();
const {
  myBakeryList,
  createBakery,
  fetchBakery,
} = require("../controllers/bakeryController");

const { createItem } = require("../controllers/itemController");
//Multer
const upload = require("../middlewares/multer");

//Checking the param:
router.param("bakeryId", async (req, res, next, bakeryId) => {
  const foundBakery = await fetchBakery(bakeryId, next);
  if (foundBakery) {
    req.foundBakery = foundBakery;
    next();
  } else {
    //Salwas way is the best
    const err = {
      status: 404,
      massage: "Bakery not found",
    };
    next(err);
  }
});

// Showing the list:
router.get("/:bakeryId?", myBakeryList);

// Creating:
router.post("/:bakeryId", upload.single("image"), createBakery);

// Creating an item:
router.post("/:bakeryId/items", upload.single("image"), createItem);

// exporting
module.exports = router;
