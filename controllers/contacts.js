/* eslint-disable array-callback-return */
// const fs = require('fs').promises;
const {
  getContacts,
  getContactById,
  addContact,
  updateContactsById,
  deleteContactById,
  updateStatusContactById,
} = require('../src/services/contactsService');

const getContactsController = async (req, res) => {
  const contacts = await getContacts();

  res.json({ contacts });
};

const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);

  res.status(200).json({ contact, message: 'Success' });
};

const addContactController = async (req, res) => {
  const { name, email, phone, favorite = false } = req.body;
  await addContact({ name, email, phone, favorite });

  res.status(201).json({ message: 'Success' });
};

const updateContactController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const { id } = req.params;
  await updateContactsById(id, { name, email, phone, favorite });

  res.status(200).json({ message: 'Success' });
};

const updateStatusContactController = async (req, res) => {
  const { favorite } = req.body;
  const { id } = req.params;
  await updateStatusContactById(id, { favorite });

  res.status(200).json({ message: 'Success' });
};

const deleteContactController = async (req, res) => {
  const { id } = req.params;
  await deleteContactById(id);

  res.status(200).json({ message: 'Contact deleted' });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  deleteContactController,
  updateStatusContactController,
};
