/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db/userModel');
const { NotAuthorizedError } = require('../helpers/errors');

const signup = async (email, password) => {
  const user = new User({
    email,
    password,
  });
  await user.save();
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

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

  return token;
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
};
