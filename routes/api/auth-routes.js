const express = require("express");

const ctrl = require("../../controllers/authController");

const { authenticate } = require("../../middlewares");

const { validateBody } = require("../../helpers");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/users/register",
  validateBody(schemas.registerSchema),
  ctrl.register
);

router.post("/users/login", validateBody(schemas.registerSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

module.exports = router;
