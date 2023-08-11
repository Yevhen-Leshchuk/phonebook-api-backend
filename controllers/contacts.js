/* eslint-disable array-callback-return */
// const fs = require('fs').promises;
const { Contact } = require('../src/db/postModel');

const getContacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.json({ contacts });
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contacts = await Contact.findById(id);
  if (!contacts) {
    res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json({ contacts, message: 'Success' });
};

const addContact = async (req, res) => {
  if (!req.body) {
    res.status(400).json({ message: 'Missing required field' });
  }
  const { name, email, phone, favorite } = req.body;
  const contact = new Contact({ name, email, phone, favorite });
  await contact.save();
  res.status(201).json({ message: 'Success' });
};

const updateContact = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const { id } = req.params;
  if (name && email && phone && favorite) {
    await Contact.findByIdAndUpdate(id, {
      $set: { name, email, phone, favorite },
    });
  }
  res.status(200).json({ message: 'Success' });
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  await Contact.findByIdAndRemove(id);
  res.status(200).json({ message: 'Contact deleted' });
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
