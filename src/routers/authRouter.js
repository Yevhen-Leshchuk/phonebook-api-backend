/* eslint-disable object-curly-spacing */
const express = require('express');
const router = new express.Router();

const { asyncWrapper } = require('../helpers/apiHelpers');
const { addAuthValidation } = require('../middlewares/validationMiddleware');
const { authMiddleware } = require('../middlewares/authMiddleware');

const {
  signupController,
  loginController,
  logoutController,
  currentUserController,
  forgotPasswordController,
} = require('../../controllers/authController');

router.post('/signup', addAuthValidation, asyncWrapper(signupController));
router.post('/login', addAuthValidation, asyncWrapper(loginController));
router.post('/forgot_password', asyncWrapper(forgotPasswordController));
router.get('/logout', authMiddleware, asyncWrapper(logoutController));
router.get('/current', authMiddleware, asyncWrapper(currentUserController));

module.exports = {
  authRouter: router,
};
