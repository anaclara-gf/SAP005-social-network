import { Register } from './index.js';
import * as service from '../../services/index.js';
import * as util from '../../utils/history.js';

service.signUp = jest.fn(() => Promise.resolve(true));
service.verifyEmail = jest.fn(() => Promise.resolve(true));
util.onNavigate = jest.fn(() => Promise.resolve(true));

describe('register', () => {
  it('should be a function', () => {
    expect(typeof Register).toBe('function');
  });
  it('should render the page', () => {
    expect(typeof Register).toMatchSnapshot();
  });
  // it('should verify the user password length', () => {
  //   Register().querySelector('#password').dispatchEvent(new Event('input'));
  //   return expect(verifyPasswordLength).resolves.toBe(true);
  // });
  // it('should confirm the user password', () => {
  //   Register().querySelector('#password').dispatchEvent(new Event('input'));
  //   return expect(verifyConfirmPassword).resolves.toBe(true);
  // });
  it('should call signUp when the user click the button', async () => {
    Register().querySelector('#signup-button').dispatchEvent(new Event('click'));
    await expect(service.signUp).toHaveBeenCalled();
    expect(service.verifyEmail).toHaveBeenCalled();
    expect(util.onNavigate).toHaveBeenCalledWith('/profile');
  });
});
