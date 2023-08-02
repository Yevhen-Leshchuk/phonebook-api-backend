const express = require('express');
const router = new express.Router();

const {
  addPostValidation,
  addPutValidation,
} = require('../middlewares/validationMiddleware');
const { asyncWrapper } = require('../helpers/apiHelpers');
const modelsMiddleware = require('../middlewares/models');

const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require('../../controllers/contacts');

router.use(modelsMiddleware);

router.get('/', asyncWrapper(getContacts));

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json({ contact, message: 'Success' });
});

router.post('/', addPostValidation, async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: 'Missing required field' });
  }

  const contact = await addContact(req.body);

  res.status(201).json({ contact, message: 'Success' });
});

router.put('/:contactId', addPutValidation, async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { contactId } = req.params;

  if (name && email && phone) {
    const updatedContact = await updateContact(contactId, req.body);
    if (updatedContact) {
      res.status(200).json({ updatedContact, message: 'Success' });
    } else {
      res.status(400).json({ message: 'Not found' });
    }
  } else {
    res.status(400).json({ message: 'Missing fields' });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await removeContact(contactId);

  if (deletedContact) {
    res.status(200).json({ message: 'Contact deleted' });
  } else {
    res.status(400).json({ message: 'Not found' });
  }
});

module.exports = {
  contactsRouter: router,
};
