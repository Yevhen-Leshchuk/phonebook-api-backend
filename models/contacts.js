const fs = require('fs').promises;
const path = require('path');
const short = require('short-uuid');

const contactsPath = path.resolve('./models/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const contact = JSON.parse(data).filter((item) => item.id === contactId);
  return contact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const newContact = {
    id: short.generate(),
    name: name,
    email: email,
    phone: phone,
  };

  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const newContactList = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContactList));

  return newContact;
};

const removeContact = async (contactId) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
