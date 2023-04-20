const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../models/user");
// const { ObjectId } = require("mongoose").Types;
const { ctrlWrapper, HttpError } = require("../helpers");
// const { nextTick } = require("process");

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  const result = await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { id, email } = req.user;

  res.json({
    id,
    email,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "Logout success",
  });
};

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  console.log(req.file);
  const { path: tempUpload, filename } = req.file;
  const avatarName = `${_id}_${filename}`;

  const avatarURL = path.join(avatarsDir, avatarName);

  // const image = await await Jimp.read(tempUpload);
  // await image.resize(250, Jimp.AUTO);
  // await image.writeAsync(tempUpload);

  // await fs.rename(tempUpload, avatarURL);

  const image = await Jimp.read(tempUpload);
  await image.resize(250, Jimp.AUTO);
  await image.writeAsync(tempUpload);

  try {
    await fs.rename(tempUpload, avatarURL);
  } catch (err) {
    return next(err);
  }
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
