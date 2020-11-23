const express = require("express");
const router = express.Router();
const {
  myList,
  deleteItem,
  updateItem,
  createItem,
} = require("../controllers/itemController");

router.get("/", myList);

// Delete:
router.delete("/:itemId", deleteItem);

// Creating:
router.post("/", createItem);

//Updating
router.put("/:itemId", updateItem);

// exporting
module.exports = router;
