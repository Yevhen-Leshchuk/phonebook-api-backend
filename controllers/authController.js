/* eslint-disable object-curly-spacing */
const jwt = require('jsonwebtoken');
const { signup, login, logout } = require('../src/services/authService');
const { ConflictError, NotAuthorizedError } = require('../src/helpers/errors');

const signupController = async (req, res) => {
  const { email, password } = req.body;

  try {
    await signup(email, password);

    res.json({ status: 'success' });
  } catch (error) {
    throw new ConflictError('Email in use');
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await login(email, password);

    res.json({ status: 'success', token });
  } catch (error) {
    throw new NotAuthorizedError('Email or password is wrong');
  }
};

const logoutController = async (req, res) => {
  const user = jwt.decode(req.token, process.env.JWT_SECRET);

  await logout(user._id);

  res.status(204).json({ status: 'No Content' });
};

module.exports = {
  signupController,
  loginController,
  logoutController,
};
