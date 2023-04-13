const { Contact } = require("../models/contact");
const { ObjectId } = require("mongoose").Types;
const { ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  // const { page = 1, limit = 20 } = req.query;
  // const skip = (page - 1) * limit;

  const result = await Contact.find(
    { owner }
    // { skip: 2, limit, name: 1, email: 1, phone: 1, favorite: 1 }
  ).populate("owner", "email");
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  if (ObjectId.isValid(contactId)) {
    const contact = await Contact.findById(contactId);
    return res.json(contact);
  } else res.status(404).json({ message: "Not found" });
};

const addContact = async (req, res, next) => {
  console.log(req.user);
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(201).json(result);
};

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  if (ObjectId.isValid(contactId)) {
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    return res.json(contact);
  } else res.status(404).json({ message: "Not found" });
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  if (ObjectId.isValid(contactId)) {
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    return res.json(contact);
  } else res.status(404).json({ message: "Not found" });
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  if (ObjectId.isValid(contactId)) {
    await Contact.findByIdAndDelete(contactId);
    return res.status(200).json({ message: `contact deleted` });
  } else res.status(404).json({ message: "Not found" });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  addContact: ctrlWrapper(addContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  getContactById: ctrlWrapper(getContactById),
  updateContactById: ctrlWrapper(updateContactById),
  deleteContact: ctrlWrapper(deleteContact),
};
