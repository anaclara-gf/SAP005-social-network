/* eslint-disable max-len */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-duplicate-imports */
/* eslint no-duplicate-imports: "error" */
import { Profile } from './index.js';
import * as service from '../../services/index.js';
// import * as util from '../../utils/history.js';
// import * as profile from './index.js';

// const verify = verifyUsername();
// verifyUsername = jest.fn(() => Promise.resolve(true));
jest.mock('../../services/index.js');
// service.searchUsername = jest.fn(() => Promise.resolve(true));
// service.InfoProfile = jest.fn(() => Promise.resolve(true));
// util.onNavigate = jest.fn(() => Promise.resolve(true));
// profile.verifyUsername = jest.fn(() => Promise.resolve(true));

describe('Profile', () => {
  it('should be a function', () => {
    expect(typeof Profile).toBe('function');
  });
  it('should render the page', () => {
    expect(typeof Profile).toMatchSnapshot();
  });
  it('should verify the username', async () => {
    service.searchUsername.mockResolvedValueOnce(true);
    const profile = Profile();
    profile.querySelector('#username').dispatchEvent(new Event('change', { target: { value: 'user012' } }));
    expect(service.searchUsername).toHaveBeenCalled();
  });
  it('should save profile info when the user click the button', async () => {
    service.InfoProfile.mockResolvedValueOnce(true);
    const profile = Profile();
    await service.searchUsername.mockResolvedValueOnce(true);
    profile.querySelector('#saveprofile-button').dispatchEvent(new Event('click'));
    expect(service.InfoProfile).toHaveBeenCalled();
    // expect(util.onNavigate).toHaveBeenCalledWith('/timeline');
  });
});
// "type": "module",
