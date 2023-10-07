/* eslint-disable object-curly-spacing */
const express = require('express');

const router = new express.Router();

const { asyncWrapper } = require('../helpers/apiHelpers');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { addVerifyValidation } = require('../middlewares/validationMiddleware');

const {
  patchUserController,
  avatarController,
  verificationController,
  resendVerificationController,
} = require('../../controllers/userController');
const { uploadMiddleware } = require('../middlewares/uploadMiddleware');

router.patch(
  '/subscription',
  authMiddleware,
  asyncWrapper(patchUserController)
);

router.patch(
  '/avatar',
  authMiddleware,
  uploadMiddleware.single('avatar'),
  asyncWrapper(avatarController)
);

router.get('/verify/:verificationToken', asyncWrapper(verificationController));

router.post(
  '/verify/',
  addVerifyValidation,
  asyncWrapper(resendVerificationController)
);

module.exports = {
  usersRouter: router,
};
