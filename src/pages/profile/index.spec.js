import { Profile } from './index.js';
// import { verifyUsername } from './index.js';
import * as service from '../../services/index.js';
import * as util from '../../utils/history.js';
// import * as profile from './index.js';

// const { verifyUsername } = require('./index.js');
// const verify = verifyUsername();
// verifyUsername = jest.fn(() => Promise.resolve(true));

service.searchUsername = jest.fn(() => Promise.resolve(true));
service.InfoProfile = jest.fn(() => Promise.resolve(true));
util.onNavigate = jest.fn(() => Promise.resolve(true));
// profile.verifyUsername = jest.fn(() => Promise.resolve(true));

describe('Profile', () => {
  it('should be a function', () => {
    expect(typeof Profile).toBe('function');
  });
  it('should render the page', () => {
    expect(typeof Profile).toMatchSnapshot();
  });
  // it('should verify the username', async () => {
  //   Profile().querySelector('#username').dispatchEvent(new Event('change'));
  //   await verifyUsername().resolves.toBe(true);
  //   return expect(service.searchUsername).toHaveBeenCalled();
  // });
  // it('should save profile info when the user click the button', async () => {
  //   Profile().querySelector('#saveprofile-button').dispatchEvent(new Event('click'));
  //   expect(service.InfoProfile).toHaveBeenCalled();
  //   expect(util.onNavigate).toHaveBeenCalledWith('/timeline');
  // });
});
