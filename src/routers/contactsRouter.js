const express = require('express');
const router = new express.Router();

const {
  addPostValidation,
  addPutValidation,
} = require('../middlewares/validationMiddleware');
const { asyncWrapper } = require('../helpers/apiHelpers');

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  deleteContactController,
} = require('../../controllers/contacts');

router.get('/', asyncWrapper(getContactsController));
router.get('/:id', asyncWrapper(getContactByIdController));
router.post('/', addPostValidation, asyncWrapper(addContactController));
router.put('/:id', addPutValidation, asyncWrapper(updateContactController));
router.delete('/:id', asyncWrapper(deleteContactController));

module.exports = {
  contactsRouter: router,
};
