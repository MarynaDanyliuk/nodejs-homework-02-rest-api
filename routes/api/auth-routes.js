const express = require("express");

const ctrl = require("../../controllers/authController");

const { authenticate, upload } = require("../../middlewares");

const {
  validateRegister,
  validateLogin,
} = require("../../validators/authValidate");

const router = express.Router();

router.post("/register", validateRegister, ctrl.register);

router.get("/verify/:verificationToken", ctrl.register);
// ctrl.verify

router.post("/login", validateLogin, ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
