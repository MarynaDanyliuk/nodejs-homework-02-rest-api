const { schemas } = require("../models/user");
const { HttpError } = require("../helpers");

const validateRegister = (req, res, next) => {
  const { error } = schemas.registerSchema.validate(req.body, {
    abortEarly: false,
  });

  if (!Object.keys(req.body).length) throw HttpError(400, "missing fields");

  if (error) {
    const missingField = error.details[0].context.key;
    return res
      .status(400)
      .json({ message: `missing required ${missingField} field` });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { error } = schemas.loginSchema.validate(req.body, {
    abortEarly: false,
  });

  if (!Object.keys(req.body).length) throw HttpError(400, "missing fields");

  if (error) {
    const missingField = error.details[0].context.key;
    return res
      .status(400)
      .json({ message: `missing required ${missingField} field` });
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};
