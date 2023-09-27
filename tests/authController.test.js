/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');
const { connectMongo } = require('../src/db/connection');

describe('Auth service login test', () => {
  beforeAll(async () => {
    await connectMongo();
  });
  it('should return login data by providing token', async () => {
    const success = 'success';
    const email = 'avatar@gmail.com';
    const password = '12345avatar';

    const response = await request(app).post('/api/auth/login').send({
      email: email,
      password: password,
    });

    expect(response.status).toBe(200);
    expect(response.body.status).toEqual(success);
    expect(typeof response.body.user.email).toBe('string');
    expect(typeof response.body.user.subscription).toBe('string');
    expect(response.body.user.token).toEqual(response.body.user.token);
  });
});
