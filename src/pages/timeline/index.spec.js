import { Timeline } from './index.js';
import * as service from '../../services/index.js';
import * as util from '../../utils/history.js';

jest.mock('../../services/index.js');

util.onNavigate = jest.fn(() => Promise.resolve(true));

describe('Login', () => {
  it('should be a function', () => {
    expect(typeof Timeline).toBe('function');
  });
  it('should render the page', () => {
    expect(typeof Timeline).toMatchSnapshot();
  });
  it('should sign out the user', () => {
    Timeline().querySelector('#signout-button').dispatchEvent(new Event('click'));
    return expect(service.signOut).toHaveBeenCalled();
  });
  // it('should post a review', async () => {
  //   Timeline().querySelector('#publish-review').dispatchEvent(new Event('click'));
  //   await expect(service.UserProfileInfo).toHaveBeenCalled();
  //   expect(service.Review).toHaveBeenCalled();
  //   expect(util.onNavigate).toHaveBeenCalledWith('/timeline');
  // });
  it('should render the modal template', () => {
    expect(typeof modalTemplate).toMatchSnapshot();
  });
  // it('should edit and update a posted review', () => {
  //   Timeline().querySelector('#update-review').dispatchEvent(new Event('click'));
  //   return expect(service.ReviewPost).toHaveBeenCalled();
  // });
  it('should render the post template', () => {
    expect(typeof postTemplate).toMatchSnapshot();
  });
//   it('should delete a review', async () => {
//     Timeline().querySelectorAll('.delete-button').dispatchEvent(new Event('click'));
//     await expect(service.Review).toHaveBeenCalled();
//     expect(typeof Timeline).toMatchSnapshot();
//   });
});
