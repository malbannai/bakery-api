const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); //bodyParser
const db = require("./db/models");

const app = express();
const itemsRoutes = require("./routes/items");

app.use(cors());
app.use(bodyParser.json()); //bodyParser
app.use("/items", itemsRoutes);

const run = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
