/* eslint-disable object-curly-spacing */
const express = require('express');
const router = new express.Router();

const { asyncWrapper } = require('../helpers/apiHelpers');
const { addAuthValidation } = require('../middlewares/validationMiddleware');

const {
  signupController,
  loginController,
} = require('../../controllers/authController');

router.post('/signup', addAuthValidation, asyncWrapper(signupController));
router.post('/login', asyncWrapper(loginController));

module.exports = {
  authRouter: router,
};
