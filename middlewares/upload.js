const multer = require("multer");
const path = require("path");
// const app = require("../app");

// const contacts = [];

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    // const date = new Date();
    // const time = date.getTime();
    // const filename = `${time}_${file.originalname}`;
    // cb(null, filename)
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;

// app.get("/api/contacts", async (req, res) => {
//   res.json(contacts);
// });

// app.post("/api/contacts", upload.single("avatar"), async (req, res) => {
//   console.log(req.body);
//   console.log(req.file);
// });
// upload.array("photo", 8)
// 8 - максимальна кількість фото

// якщо файли для запиту передаються в кількох полях використовуємо метод fields,
// де передаємо массив об'єктів - upload.fields([{name: "avatar", maxCount: 1}, {name: "photo", maxCount: 8}, {}])

// app.listen(3000);
