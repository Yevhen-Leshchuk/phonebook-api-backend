const express = require('express');
const router = new express.Router();

const {
  addPostValidation,
  addPutValidation,
  addPatchValidation,
} = require('../middlewares/validationMiddleware');
const { asyncWrapper } = require('../helpers/apiHelpers');
const { authMiddleware } = require('../middlewares/authMiddleware');

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  updateStatusContactController,
  deleteContactController,
} = require('../../controllers/contactController');

router.use(authMiddleware);

router.get('/', asyncWrapper(getContactsController));
router.get('/:id', asyncWrapper(getContactByIdController));
router.post('/', addPostValidation, asyncWrapper(addContactController));
router.put('/:id', addPutValidation, asyncWrapper(updateContactController));
router.patch(
  '/:id/favorite',
  addPatchValidation,
  asyncWrapper(updateStatusContactController)
);
router.delete('/:id', asyncWrapper(deleteContactController));

module.exports = {
  contactsRouter: router,
};
