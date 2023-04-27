const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const nodemailer = require("nodemailer");
require("dotenv").config();

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // 25, 465, 2525
  secure: true,
  auth: {
    user: "marydanyliuk@meta.ua",
    pass: process.env.META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const emailOptions = {
  to: "mahera1071@syinxun.com",
  from: "marydanyliuk@meta.ua",
  subject: "Test email",
  text: "Привіт. Ми тестуємо надсилання листів!",
};

transporter
  .sendMail(emailOptions)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));

const contactsRouter = require("./routes/api/contacts-routes");
const authRouter = require("./routes/api/auth-routes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
});

module.exports = app;

// const multer = require("multer");
// const path = require("path");
// const fs = require("fs/promises");
// const { nanoid } = require("nanoid");

// const tempDir = path.join(__dirname, "temp");

// const multerConfig = multer.diskStorage({
//   destination: tempDir,
//   filename: (req, file, cb) => {
//     // const date = new Date();
//     // const time = date.getTime();
//     // const filename = `${time}_${file.originalname}`;
//     // cb(null, filename)
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: multerConfig,
// });
