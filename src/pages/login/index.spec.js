import { Login } from './index.js';
import { SignIn } from '../../services/index.js';

describe('Login', () => {
  it('should be a function', () => {
    expect(typeof Login).toBe('function');
  });
});
