const express = require("express");

const ctrl = require("../../controllers/contactsControllers");

const { isValidId, authenticate } = require("../../middlewares");

const {
  validateAddContact,
  validateUpdContact,
  validateUpdStatusContact,
} = require("../../validators/contactsValidators");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post("/", authenticate, validateAddContact, ctrl.addContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateUpdContact,
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateUpdStatusContact,
  ctrl.updateStatusContact
);
router.delete("/:contactId", isValidId, ctrl.deleteContact);

module.exports = router;
