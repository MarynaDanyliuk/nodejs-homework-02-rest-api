const bcrypt = require("bcryptjs");

const { User } = require("../models/user");

// const { ObjectId } = require("mongoose").Types;
const { ctrlWrapper, HttpError } = require("../helpers");

const register = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const result = await User.create(req.body);

  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
  });
};

const login = async (req, res) => {
  const result = await User.create(req.body);

  res.status(201).json({
    email: result.email,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
