/* eslint-disable spaced-comment */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
const { User } = require('../db/userModel');
const {
  NotAuthorizedError,
  WrongParametersError,
} = require('../helpers/errors');
const { v4: uuidv4 } = require('uuid');
const sgMail = require('@sendgrid/mail');
const Jimp = require('jimp');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

const verification = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw new NotAuthorizedError('Not found');
  }

  user.verificationToken = null;
  user.verify = true;

  await user.save();
};

const resendVerification = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotAuthorizedError('User not found');
  }

  if (!user.verify) {
    const message = {
      from: process.env.NODEMAILER_LOGIN,
      to: email,
      subject: 'Thank you for registration',
      templateId: 'd-4d7d39a85da14d819abb905cb00f8a56',
      dynamicTemplateData: {
        organizationName: 'phonebook-api-verification',
        url: `http://localhost:8080/api/users/verify/${user.verificationToken}`,
      },
    };

    await sgMail.send(message);
  } else {
    throw new WrongParametersError('Verification has already been passed');
  }
};

//TODO: add forgot password endpoint

module.exports = {
  patchUser,
  avatar,
  verification,
  resendVerification,
};
