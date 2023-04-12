const express = require("express");

const ctrl = require("../../controllers/authController");

const { validateBody } = require("../../helpers");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/users/register",
  validateBody(schemas.registerSchema),
  ctrl.register
);

router.post(
  "/users/login",
  validateBody(schemas.registerSchema),
  ctrl.register
);

module.exports = router;
