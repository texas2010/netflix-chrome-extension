import { getLimitUserInfoData, error } from '.';

describe('getLimitUserInfoData function', () => {
  test('should throw error when argument is not exist', () => {
    expect(getLimitUserInfoData).toThrowError(error.argumentRequired);
  });

  test('should have same argument object and return object', () => {
    const expected = {
      name: null,
      membershipStatus: 'ANONYMOUS',
      userGuid: null,
      guid: null,
    };
    const result = getLimitUserInfoData({
      name: null,
      membershipStatus: 'ANONYMOUS',
      userGuid: null,
      guid: null,
    });

    expect(result).toEqual(expected);
  });
});
