// importamos la funcion que vamos a testear
import {
  signUp,
  verifyEmail,
  verifyUser,
  InfoProfileEmail,
  UserInfoUid,
  InfoProfile,
  searchUsername,
  SignIn,
  signInGoogle,
  signOut,
  UserProfileInfo,
  Review,
  ReviewsData,
  ReviewPost,
  AgreePostClick,
  AgreePostClickOut,
  DisagreePostClick,
  DisagreePostClickOut,
} from './index';

describe('signUp', () => {
  it('should be a function', () => {
    expect(typeof signUp).toBe('function');
  });
});
describe('verifyEmail', () => {
  it('should be a function', () => {
    expect(typeof verifyEmail).toBe('function');
  });
});
describe('verifyUser', () => {
  it('should be a function', () => {
    expect(typeof verifyUser).toBe('function');
  });
});
describe('InfoProfileEmail', () => {
  it('should be a function', () => {
    expect(typeof InfoProfileEmail).toBe('function');
  });
});
describe('UserInfoUid', () => {
  it('should be a function', () => {
    expect(typeof UserInfoUid).toBe('function');
  });
});
describe('InfoProfile', () => {
  it('should be a function', () => {
    expect(typeof InfoProfile).toBe('function');
  });
});
describe('searchUsername', () => {
  it('should be a function', () => {
    expect(typeof searchUsername).toBe('function');
  });
});
describe('SignIn', () => {
  it('should be a function', () => {
    expect(typeof SignIn).toBe('function');
  });
});
describe('signInGoogle', () => {
  it('should be a function', () => {
    expect(typeof signInGoogle).toBe('function');
  });
});
describe('signOut', () => {
  it('should be a function', () => {
    expect(typeof signOut).toBe('function');
  });
});
describe('UserProfileInfo', () => {
  it('should be a function', () => {
    expect(typeof UserProfileInfo).toBe('function');
  });
});
describe('Review', () => {
  it('should be a function', () => {
    expect(typeof Review).toBe('function');
  });
});
describe('ReviewsData', () => {
  it('should be a function', () => {
    expect(typeof ReviewsData).toBe('function');
  });
});
describe('ReviewPost', () => {
  it('should be a function', () => {
    expect(typeof ReviewPost).toBe('function');
  });
});
describe('AgreePostClick', () => {
  it('should be a function', () => {
    expect(typeof AgreePostClick).toBe('function');
  });
});
describe('AgreePostClickOut', () => {
  it('should be a function', () => {
    expect(typeof AgreePostClickOut).toBe('function');
  });
});
describe('DisagreePostClick', () => {
  it('should be a function', () => {
    expect(typeof DisagreePostClick).toBe('function');
  });
});
describe('DisagreePostClickOut', () => {
  it('should be a function', () => {
    expect(typeof DisagreePostClickOut).toBe('function');
  });
});
