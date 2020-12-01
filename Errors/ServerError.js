// The Path not found Middleware: its used after all the functions above dont work
function serverError(req, res, next) {
  res.status(404).json({ message: "Path not found" });
  // Next in this case can be used, but the .json message will already end the response
  // Next will only end this request and allows it to continue with whatever is after it
}

module.exports = serverError();
