// importamos la funcion que vamos a testear
import { signUp } from './index';

describe('myFunction', () => {
  it('should be a function', () => {
    expect(typeof signUp).toBe('function');
  });
});
