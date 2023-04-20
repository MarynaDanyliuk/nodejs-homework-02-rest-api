const multer = require("multer");
const path = require("path");
// const Jimp = require("jimp");

// const { HttpError } = require("../helpers");
// const app = require("../app");

// const contacts = [];

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
