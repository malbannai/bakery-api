// Multer Setup
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
  // Not important cb: call back
  // Date() is here just incase 2 items have so similar data!!!
});

// The multer variubale
const upload = multer({
  storage,
});

module.exports = upload;
