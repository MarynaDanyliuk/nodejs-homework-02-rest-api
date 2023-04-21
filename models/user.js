const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { MongooseError } = require("../helpers");
// const { required } = require("joi");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

userSchema.post("save", MongooseError);

const registerSchema = Joi.object({
  subscription: Joi.string(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
