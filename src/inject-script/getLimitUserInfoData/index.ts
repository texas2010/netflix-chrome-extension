import { NetflixTypes } from '@types';

interface GetLimitUserInfoData {
  (userInfoObj: undefined | NetflixTypes.UserInfo):
    | undefined
    | NetflixTypes.UserInfo;
}

export const getLimitUserInfoData: GetLimitUserInfoData = (userInfoObj) => {
  if (!userInfoObj) {
    return undefined;
  }

  const { guid, membershipStatus, name, userGuid } = userInfoObj;

  return { guid, membershipStatus, name, userGuid };
};
