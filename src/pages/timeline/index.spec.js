import { Timeline } from './index.js';
import * as service from '../../services/index.js';
import * as util from '../../utils/history.js';

service.signOut = jest.fn(() => Promise.resolve(true));
jest.mock('../../services/index.js');
jest.mock('../../utils/history.js');

describe('Login', () => {
  it('should be a function', () => {
    expect(typeof Timeline).toBe('function');
  });
  it('should render the page', () => {
    expect(typeof Timeline).toMatchSnapshot();
  });
  it('should sign out the user', () => {
    service.UserProfileInfo.mockResolvedValueOnce(true);
    service.ReviewsData.mockResolvedValueOnce(true);
    Timeline().querySelector('#signout-button').dispatchEvent(new Event('click'));
    return expect(service.signOut).toHaveBeenCalled();
  });
  it('should post a review', async () => {
    service.ReviewsData.mockResolvedValueOnce(true);
    service.Review.mockResolvedValueOnce(true);
    service.UserProfileInfo.mockResolvedValueOnce(true);
    const timeline = Timeline();
    timeline.querySelector('#publish-review').dispatchEvent(new Event('click'));
    await expect(service.UserProfileInfo).toHaveBeenCalled();
    await expect(service.Review).toHaveBeenCalled();
    expect(util.onNavigate).toHaveBeenCalledWith('/timeline');
  });
  it('should render the modal template', () => {
    expect(typeof modalTemplate).toMatchSnapshot();
  });
  it('should edit and update a posted review', async () => {
    service.ReviewsData.mockResolvedValueOnce(true);
    service.ReviewPost.mockResolvedValueOnce(true);
    service.UserProfileInfo.mockResolvedValueOnce(true);
    const timeline = Timeline();
    // await timeline.querySelector('.edit-button').dispatchEvent(new Event('click'));
    timeline.querySelector('#update-review').dispatchEvent(new Event('click'));
    return expect(service.ReviewPost).toHaveBeenCalled();
  });
  it('should render the post template', () => {
    expect(typeof postTemplate).toMatchSnapshot();
  });
  it('should call agree when the user click the button', async () => {
    service.ReviewsData.mockResolvedValueOnce(true);
    service.UserProfileInfo.mockResolvedValueOnce(true);
    service.AgreePostClick.mockResolvedValueOnce(true);
    service.AgreePostClickOut.mockResolvedValueOnce(true);
    const timeline = Timeline();
    timeline.querySelector('.agree-button').dispatchEvent(new Event('click'));
    expect(service.AgreePostClick).toHaveBeenCalled();
    // clickout
    timeline.querySelector('.agree-button').dispatchEvent(new Event('click'));
    expect(service.AgreePostClickOut).toHaveBeenCalled();
  });
  it('should call disagree when the user click the button', async () => {
    service.ReviewsData.mockResolvedValueOnce(true);
    service.UserProfileInfo.mockResolvedValueOnce(true);
    service.DisagreePostClick.mockResolvedValueOnce(true);
    service.DisagreePostClickOut.mockResolvedValueOnce(true);
    const timeline = Timeline();
    timeline.querySelector('.disagree-button').dispatchEvent(new Event('click'));
    expect(service.DisagreePostClick).toHaveBeenCalled();
    // clickout
    timeline.querySelector('.disagree-button').dispatchEvent(new Event('click'));
    expect(service.DisagreePostClickOut).toHaveBeenCalled();
  });
});
