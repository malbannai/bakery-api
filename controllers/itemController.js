let data = require("../data");
const slugify = require("slugify");

exports.myList = (req, res) => {
  res.json(data);
};

exports.deleteItem = (req, res) => {
  const { itemId } = req.params;
  const foundItem = data.find((item) => item.id === +itemId);
  if (foundItem) {
    data = data.filter((item) => item.id !== +itemId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Item not found" });
  }
};

exports.createItem = (req, res) => {
  const id = data[data.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newItem = { id, slug, ...req.body };
  data.push(newItem);
  res.status(201).json(newItem);
};

exports.updateItem = (req, res) => {
  const { itemId } = req.params;
  const foundItem = data.find((item) => item.id === +itemId);
  if (foundItem) {
    for (const key in req.body) foundItem[key] = req.body[key];
    foundItem.slug = slugify(req.body.name, { lower: true });
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Item not found" });
  }
};
