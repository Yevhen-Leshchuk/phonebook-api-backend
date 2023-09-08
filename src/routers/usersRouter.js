/* eslint-disable object-curly-spacing */
const express = require('express');
const router = new express.Router();

const { asyncWrapper } = require('../helpers/apiHelpers');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { patchUserController } = require('../../controllers/userController');

router.patch(
  '/subscription',
  authMiddleware,
  asyncWrapper(patchUserController)
);

module.exports = {
  usersRouter: router,
};
