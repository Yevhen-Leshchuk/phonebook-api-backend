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
} = require('../../controllers/authController');

router.post('/signup', addAuthValidation, asyncWrapper(signupController));
router.post('/login', addAuthValidation, asyncWrapper(loginController));
router.get('/logout', authMiddleware, asyncWrapper(logoutController));

module.exports = {
  authRouter: router,
};
