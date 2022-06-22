import { Netflix } from '@types';

interface GetLimitUserInfoData {
  (userInfoObj: Netflix.UserInfo): Netflix.UserInfo;
}

export const getLimitUserInfoData: GetLimitUserInfoData = (userInfoObj) => {
  const { guid, membershipStatus, name, userGuid } = userInfoObj;

  return { guid, membershipStatus, name, userGuid };
};
