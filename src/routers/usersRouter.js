/* eslint-disable object-curly-spacing */
const express = require('express');

const router = new express.Router();

const { asyncWrapper } = require('../helpers/apiHelpers');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { patchUserController } = require('../../controllers/userController');
const { avatarController } = require('../../controllers/userController');
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

module.exports = {
  usersRouter: router,
};
