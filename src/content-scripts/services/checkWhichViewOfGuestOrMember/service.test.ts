import { NetflixConstants } from '@app/constants';
import { checkWhichViewOfGuestOrMember, error } from '.';

describe('checkWhichViewOfGuestOrMember function', () => {
  beforeAll(() => {
    chrome.storage.local.set({ userSettings: { devLog: false } });
  });

  test('should throw error when argument is not exist', () => {
    expect(checkWhichViewOfGuestOrMember).toThrowError(error.arugmentRequired);
  });

  test('should ?', () => {
    const result = checkWhichViewOfGuestOrMember({
      userInfo: {
        guid: null,
        userGuid: null,
        name: null,
        membershipStatus: NetflixConstants.MembershipStatus.ANONYMOUS,
      },
      profileGateState: undefined,
    });
  });
});
