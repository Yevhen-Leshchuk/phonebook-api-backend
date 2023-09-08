/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
const { User } = require('../db/userModel');
const { NotAuthorizedError } = require('../helpers/errors');

const patchUser = async (id, subscription) => {
  const user = await User.findById(id);

  if (!user) {
    throw new NotAuthorizedError('Not authorized');
  }

  user.subscription = subscription;
  await user.save();
};

module.exports = {
  patchUser,
};
