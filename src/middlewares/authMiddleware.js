/* eslint-disable indent */
/* eslint-disable spaced-comment */
/* eslint-disable object-curly-spacing */
const jwt = require('jsonwebtoken');
const { NotAuthorizedError } = require('../helpers/errors');
const { User } = require('../db/userModel');

const authMiddleware = async (req, res, next) => {
  try {
    //TODO: validate tape token later (typeToken).
    const { authorization } = req.headers;
    if (!authorization) {
      next(
        new NotAuthorizedError(
          'Please provide a token in request authorization header'
        )
      );
    }
    const [, token] = authorization.split(' ');

    if (!token) {
      next(new NotAuthorizedError('Please provide a token'));
    }

    const user = jwt.decode(token, process.env.JWT_SECRET);
    const foundUser = await User.findById(user._id);

    if (!foundUser) {
      next(new NotAuthorizedError('Not authorized'));
    }

    if (foundUser.token !== token) {
      next(new NotAuthorizedError('Not authorized'));
    }

    req.token = token;
    req.user = foundUser;
    next();
  } catch (error) {
    next(new NotAuthorizedError('Invalid a token'));
  }
};

module.exports = {
  authMiddleware,
};
