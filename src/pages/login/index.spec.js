import { Login } from './index.js';
import * as service from '../../services/index.js';
import * as util from '../../utils/history.js';

service.SignIn = jest.fn(() => Promise.resolve(true));
service.signInGoogle = jest.fn(() => Promise.resolve(true));
util.onNavigate = jest.fn(() => Promise.resolve(true));

describe('Login', () => {
  it('should be a function', () => {
    expect(typeof Login).toBe('function');
  });
  it('should render the page', () => {
    expect(typeof Login).toMatchSnapshot();
  });
  it('should call SignIn when the user click the button', () => {
    Login().querySelector('#signin-button').dispatchEvent(new Event('click'));
    return expect(service.SignIn).toHaveBeenCalled();
  });
  it('Sign in error', async () => {
    Login().querySelector('#signin-button').dispatchEvent(new Event('click'));
    try {
      await service.SignIn;
    } catch (error) {
      expect(error).toThrow(error);
    }
  });
  it('should call signInGoogle when the user click the button', () => {
    Login().querySelector('#signingoogle-button').dispatchEvent(new Event('click'));
    return expect(service.signInGoogle).toHaveBeenCalled();
  });
  it('Sign in with Google error', async () => {
    Login().querySelector('#signingoogle-button').dispatchEvent(new Event('click'));
    try {
      await service.signInGoogle;
    } catch (error) {
      expect(error).toThrow(error);
    }
  });
  it('should redirect the user to register page', () => {
    Login().querySelector('#signup-button').dispatchEvent(new Event('click'));
    return expect(util.onNavigate).toHaveBeenCalledWith('/register');
  });
});
