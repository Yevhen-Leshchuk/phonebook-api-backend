/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
const { User } = require('../db/userModel');
const { NotAuthorizedError } = require('../helpers/errors');
const { v4: uuidv4 } = require('uuid');
const Jimp = require('jimp');

const patchUser = async (id, subscription) => {
  const user = await User.findById(id);

  if (!user) {
    throw new NotAuthorizedError('Not authorized');
  }

  user.subscription = subscription;
  await user.save();
};

const avatar = async (id, reqFile) => {
  if (!id) {
    throw new NotAuthorizedError('Not authorized');
  }

  const { path: temporaryName, originalname } = reqFile;

  const [, extension] = originalname.split('.');
  const avatarName = `${uuidv4()}.${extension}`;

  Jimp.read(temporaryName, (err, avatar) => {
    if (err) throw err;
    avatar.resize(250, 250).quality(60).write(`public/avatars/${avatarName}`);
  });

  const user = await User.findByIdAndUpdate(id, {
    $set: { avatarURL: `/avatar/${avatarName}` },
  });

  return user;
};

module.exports = {
  patchUser,
  avatar,
};
