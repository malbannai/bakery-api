const express = require("express");
const router = express.Router();
const {
  myList,
  deleteItem,
  updateItem,
  fetchItem,
} = require("../controllers/itemController");

//Multer
const upload = require("../middlewares/multer");

// Param Middleware takes the same path and a function
router.param("itemId", async (req, res, next, itemId) => {
  const foundItem = await fetchItem(itemId, next);
  if (foundItem) {
    req.foundItem = foundItem;
    next();
  } else {
    //Salwas way is the best
    const err = {
      status: 404,
      massage: "Item not found",
    };
    next(err);
  }
});

// Showing the list:
router.get("/", myList);

// Delete:
router.delete("/:itemId", deleteItem);

//Updating
router.put("/:itemId", upload.single("image"), updateItem);

// exporting
module.exports = router;
