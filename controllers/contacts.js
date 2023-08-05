/* eslint-disable array-callback-return */
// const fs = require('fs').promises;
const ObjectId = require('mongodb').ObjectId;

const getContacts = async (req, res) => {
  const contacts = await req.db.Contacts.find({}).toArray();
  res.json({ contacts });
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contacts = await req.db.Contacts.findOne({ _id: new ObjectId(id) });

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

  await req.db.Contacts.insertOne({ name, email, phone, favorite });

  res.status(201).json({ message: 'Success' });
};

const updateContact = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const { id } = req.params;

  if (name && email && phone && favorite) {
    await req.db.Contacts.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, email, phone, favorite } }
    );
  }

  res.status(200).json({ message: 'Success' });
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  await req.db.Contacts.deleteOne({ _id: new ObjectId(id) });

  res.status(200).json({ message: 'Contact deleted' });
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
