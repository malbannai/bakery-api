const express = require("express");
const cors = require("cors");
const data = require("./data");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  // console.log("HELLO");
  res.json({ message: "Test Test" });
});

app.get("/cookies", (req, res) => {
  res.json(data);
});

app.listen(8000);
