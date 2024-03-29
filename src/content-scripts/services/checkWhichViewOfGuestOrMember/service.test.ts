import { NetflixConstants } from '@constants';
import { checkWhichViewOfGuestOrMember, error } from '.';

describe('checkWhichViewOfGuestOrMember function', () => {
  beforeAll(() => {
    chrome.storage.local.set({ userSettings: { devLog: false } });
  });

  test('should throw error when argument is not exist', () => {
    expect(checkWhichViewOfGuestOrMember).toThrowError(error.arugmentRequired);
  });

  test('should get undefined when userInfo have undefined in the argument object', () => {
    const result = checkWhichViewOfGuestOrMember({
      userInfo: undefined,
    });

    expect(result).toBe(false);
  });

  test('should get ANONYMOUS when view is not logged in', () => {
    const result = checkWhichViewOfGuestOrMember({
      userInfo: {
        guid: null,
        userGuid: null,
        name: null,
        membershipStatus: NetflixConstants.ANONYMOUS,
      },
    });

    const expected = NetflixConstants.ANONYMOUS;

    expect(result).toBe(expected);
  });

  test('should get CURRENT_MEMBER when view is logged-in', () => {
    const result = checkWhichViewOfGuestOrMember({
      userInfo: {
        guid: 'fakeIdNumber',
        userGuid: 'fakeIdNumber',
        name: 'John Smith',
        membershipStatus: NetflixConstants.CURRENT_MEMBER,
      },
    });

    const expected = NetflixConstants.CURRENT_MEMBER;

    expect(result).toBe(expected);
  });
});
