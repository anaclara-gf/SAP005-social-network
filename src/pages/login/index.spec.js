/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
// eslint-disable-next-line import/no-unresolved
import { Login } from './index.js';
import { SignIn } from '../../services/index.js';
// InfoProfileEmail, verifyUser, signInGoogle
// signInGoogle = jest.fn(() => Promise.resolve(true));
// SignIn = jest.fn(() => Promise.resolve(true));
// const firebase = require('@firebase/testing');
const login = require('./index.js');

jest.mock('./index.js');

describe('Login', () => {
  it('should be a function', () => {
    expect(typeof Login).toBe('function');
  });

  it('user click the login button', async () => {
    const login = Login();
    login.querySelector('#signin-button').dispatchEvent(new Event('click'));
    await expect(SignIn()).resolves.toHaveBeenCalled();
    // return expect(login).resolves
  });
});
