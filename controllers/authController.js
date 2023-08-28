/* eslint-disable object-curly-spacing */
const { signup, login } = require('../src/services/authService');

const signupController = async (req, res) => {
  const { email, password } = req.body;

  await signup(email, password);

  res.json({ status: 'success' });
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
