const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); //bodyParser
const db = require("./db/models");
// const { serverError } = require("./Errors/ServerError");
const path = require("path");
const app = express();
const itemsRoutes = require("./routes/items");

// Middlewares
app.use(cors());
app.use(bodyParser.json()); //bodyParser
app.use("/items", itemsRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));
// app.use("/*", serverError);

// The Path not found Middleware: its used after all the functions above dont work
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
  // Next in this case can be used, but the .json message will already end the response
  // Next will only end this request and allows it to continue with whatever is after it
});

// The error handeling method: this method will recive all the errors along with their messages to print
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

// Where the app runs
const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();

/*
Middleware structure: 
app.use((req,res,next)=>{
  //... any action
  next();
  // Next will end the middleware
})

In an older way, we can write Middleware as: 
function myCallback(requestObject, responseObject, nextMiddleware) {
  //... where this function must be called in the parameters of another app.use()
}
*/
