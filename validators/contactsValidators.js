const { schemas } = require("../models/contact");

const validateAddContact = (req, res, next) => {
  if (!Object.keys(req.body).length)
    return res.status(400).json({ message: "missing fields" });
  const { error } = schemas.addSchema.validate(req.body);

  if (error) {
    const missingField = error.details[0].context.key;
    return res
      .status(400)
      .json({ message: `missing required ${missingField} field` });
  }
  next();
};

const validateUpdContact = (req, res, next) => {
  if (!Object.keys(req.body).length)
    return res.status(400).json({ message: "missing fields" });

  const { error } = schemas.addSchemaUpd.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

const validateUpdStatusContact = (req, res, next) => {
  // if (!Object.keys(req.body).length)
  //   return res.status(400).json({ message: "missing field favorite" });

  const { error } = schemas.updateFavoriteSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  next();
};

module.exports = {
  validateAddContact,
  validateUpdContact,
  validateUpdStatusContact,
};
