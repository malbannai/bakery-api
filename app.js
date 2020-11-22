const express = require("express");
const cors = require("cors");
let data = require("./data");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  // console.log("HELLO");
  res.json({ message: "Test Test" });
});

app.get("/items", (req, res) => {
  res.json(data);
});

// Delete:
app.delete("/items/:itemId", (req, res) => {
  const { itemId } = req.params;
  const foundItem = data.find((item) => item.id === +itemId);
  if (foundItem) {
    data = data.filter((item) => item.id !== +itemId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

app.listen(8000);
