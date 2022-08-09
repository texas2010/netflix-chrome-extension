import { NetflixConstants } from '@constants';

import { getLimitUserInfoData } from '.';

describe('getLimitUserInfoData function', () => {
  test('should throw error when argument is not exist', () => {
    expect(getLimitUserInfoData(undefined)).toBeUndefined();
  });

  test('should have same argument object and return object', () => {
    const expected = {
      name: null,
      membershipStatus: NetflixConstants.ANONYMOUS,
      userGuid: null,
      guid: null,
    };

    const result = getLimitUserInfoData({
      name: null,
      membershipStatus: NetflixConstants.ANONYMOUS,
      userGuid: null,
      guid: null,
    });

    expect(result).toEqual(expected);
  });
});
