const express = require('express');
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
} = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ contacts, message: 'success' });
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
  if (!req.body) {
    res.status(400).json({ message: `missing required field` });
  }

  const contact = await addContact(req.body);

  res.status(201).json({ contact, message: 'success' });
});

router.put('/:contactId', async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { contactId } = req.params;

  if (name && email && phone) {
    const updatedContact = await updateContact(contactId, req.body);
    if (updatedContact) {
      res.status(200).json({ updatedContact, message: 'success' });
    } else {
      res.status(400).json({ message: 'Not found' });
    }
  } else {
    res.status(400).json({ message: 'missing fields' });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
