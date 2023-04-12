const { User } = require("../models/user");
// const { ObjectId } = require("mongoose").Types;
const { ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
  const result = User.create(req.body);
  res.status(201).json({
    name: result.name,
    email: result.email,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
