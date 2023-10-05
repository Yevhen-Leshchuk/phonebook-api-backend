/* eslint-disable object-curly-spacing */
const jwt = require('jsonwebtoken');
const {
  patchUser,
  avatar,
  verification,
} = require('../src/services/userService');

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

const verificationController = async (req, res) => {
  const { verificationToken } = req.params;

  await verification(verificationToken);
  res.json({ status: 'Verification successful' });
};

module.exports = {
  patchUserController,
  avatarController,
  verificationController,
};
