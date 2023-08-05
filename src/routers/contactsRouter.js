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
router.get('/:id', asyncWrapper(getContactById));
router.post('/', addPostValidation, asyncWrapper(addContact));
router.put('/:id', addPutValidation, asyncWrapper(updateContact));
router.delete('/:id', asyncWrapper(removeContact));

module.exports = {
  contactsRouter: router,
};
