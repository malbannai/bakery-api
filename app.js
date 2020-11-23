const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); //bodyParser

const app = express();
const itemsRoutes = require("./routes/items");

app.use(cors());
app.use(bodyParser.json()); //bodyParser
app.use("/items", itemsRoutes);

app.listen(8000);
