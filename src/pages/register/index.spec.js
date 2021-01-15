import { Register } from './index.js';
import * as service from '../../services/index.js';
import * as util from '../../utils/history.js';

jest.mock('../../services/index.js');
jest.mock('../../utils/history.js');

describe('register', () => {
  it('should be a function', () => {
    expect(typeof Register).toBe('function');
  });
  it('should render the page', () => {
    expect(typeof Register).toMatchSnapshot();
  });
  it('should call signUp when the user click the button', async () => {
    service.signUp.mockResolvedValueOnce(true);
    service.verifyEmail.mockResolvedValueOnce(true);
    const register = Register();
    register.querySelector('#signup-button').dispatchEvent(new Event('click'));
    await expect(service.signUp).toHaveBeenCalled();
    expect(service.verifyEmail).toHaveBeenCalled();
    expect(util.onNavigate).toHaveBeenCalledWith('/profile');
  });
});
