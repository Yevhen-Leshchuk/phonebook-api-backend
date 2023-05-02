const express = require('express');
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
} = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.json({ contacts, message: 'success' });
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json({ contact, message: 'success' });
});

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  const contact = await addContact(req.body);

  if (!name || !email || !phone) {
    res.status(400).json({ message: `missing required field` });
  }

  res.status(201).json({ contact, message: 'success' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
