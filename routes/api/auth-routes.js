const express = require("express");

const ctrl = require("../../controllers/authController");

const { authenticate } = require("../../middlewares");

const {
  validateRegister,
  validateLogin,
} = require("../../validators/authValidate");

const router = express.Router();

router.post("/register", validateRegister, ctrl.register);

router.post("/login", validateLogin, ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
