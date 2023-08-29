/* eslint-disable object-curly-spacing */
const { signup, login } = require('../src/services/authService');
const { ConflictError } = require('../src/helpers/errors');

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
  const { email, password } = req.body;

  const token = await login(email, password);

  res.json({ status: 'success', token });
};

module.exports = {
  signupController,
  loginController,
};
