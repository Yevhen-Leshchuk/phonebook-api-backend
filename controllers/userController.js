/* eslint-disable object-curly-spacing */
const jwt = require('jsonwebtoken');
const { patchUser, avatar } = require('../src/services/userService');

const patchUserController = async (req, res) => {
  const user = jwt.decode(req.token, process.env.JWT_SECRET);
  const { subscription } = req.body;

  const subscriptions = ['starter', 'pro', 'business'];

  if (subscriptions.includes(subscription)) {
    await patchUser(user._id, subscription);

    res.json({ status: 'success' });
  }
};

const avatarController = async (req, res) => {
  const user = jwt.decode(req.token, process.env.JWT_SECRET);

  const responseBody = await avatar(user._id, req.file);
  const { avatarURL } = responseBody;

  res.json({ status: 'success', avatarURL });
};

module.exports = {
  patchUserController,
  avatarController,
};
