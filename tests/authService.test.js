/* eslint-disable no-undef */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { login } = require('../src/services/authService');
const { User } = require('../src/db/userModel');
require('dotenv').config();

describe('Auth service login test', () => {
  it('should return login data by providing token', async () => {
    const email = 'avatar@gmail.com';
    const password = '11111';
    const subscription = 'starter';

    const user = {
      _id: 123,
      email: email,
      subscription: subscription,
    };

    jest.spyOn(User, 'findOne').mockImplementationOnce(async () => user);
    jest.spyOn(bcrypt, 'compare').mockReturnValue(true);

    user.save = jest.fn();

    const result = await login(email, password);

    expect(result.email).toEqual(email);
    expect(result.subscription).toEqual(subscription);
    expect(result.token).toBeDefined();

    const tokenPayload = jwt.decode(result.token);

    expect(tokenPayload._id).toEqual(user._id);
  });
});
