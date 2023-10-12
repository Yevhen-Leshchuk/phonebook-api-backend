/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');
const sgMail = require('@sendgrid/mail');
const { User } = require('../db/userModel');
const { NotAuthorizedError } = require('../helpers/errors');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const signup = async (email, password) => {
  const url = gravatar.url(email);
  const verificationToken = uuidv4();

  const user = new User({
    email,
    password,
    avatarURL: url,
    verificationToken: verificationToken,
  });
  await user.save();

  const message = {
    from: process.env.NODEMAILER_LOGIN,
    to: email,
    subject: 'Thank you for registration',
    templateId: 'd-4d7d39a85da14d819abb905cb00f8a56',
    dynamicTemplateData: {
      organizationName: 'phonebook-api-verification',
      url: `http://localhost:8080/api/users/verify/${verificationToken}`,
    },
  };

  await sgMail.send(message);
};

const login = async (email, password) => {
  let user = await User.findOne({ email, verify: true });

  if (!user) {
    throw new NotAuthorizedError(`No user with email '${email}' found`);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError(`Wrong password`);
  }

  const token = jwt.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.JWT_SECRET
  );

  user.token = token;

  await user.save();

  const userSubscription = user.subscription;

  user = {
    email,
    subscription: userSubscription,
    token,
  };

  return user;
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email, verify: true });

  if (!user) {
    throw new NotAuthorizedError(`No user with email '${email}' found`);
  }

  const newPassword = uuidv4();

  user.password = newPassword;
  user.save();

  const message = {
    from: process.env.NODEMAILER_LOGIN,
    to: user.email,
    subject: 'Forgot password',
    templateId: 'd-87c49aafb00248439a9d04df8513ef9a',
    dynamicTemplateData: {
      organizationName: 'phonebook-api-forgot-password',
      password: newPassword,
    },
  };

  await sgMail.send(message);
};

const logout = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new NotAuthorizedError('Not authorized');
  }

  user.token = null;
  await user.save();
};

const current = async (id) => {
  const user = await User.findById(id).select({
    _id: 0,
    email: 1,
    subscription: 1,
  });

  if (!user) {
    throw new NotAuthorizedError('Not authorized');
  }

  return user;
};

module.exports = {
  signup,
  login,
  logout,
  current,
  forgotPassword,
};
