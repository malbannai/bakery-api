const express = require("express");
const cors = require("cors");
let data = require("./data");
const bodyParser = require("body-parser"); //bodyParser
const slugify = require("slugify");

const app = express();
app.use(cors());
app.use(bodyParser.json()); //bodyParser

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

// Creating:
app.post("/items", (req, res) => {
  const id = data[data.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newItem = { id, slug, ...req.body };
  data.push(newItem);
  res.status(201).json(newItem);
});

//Updating
app.put("/items/:itemId", (req, res) => {
  const { itemId } = req.params;
  const foundCookie = data.find((item) => item.id === +itemId);
  if (foundCookie) {
    for (const key in req.body) foundCookie[key] = req.body[key];
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

app.listen(8000);
