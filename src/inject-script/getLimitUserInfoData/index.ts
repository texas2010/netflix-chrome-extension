import { Netflix } from '@types';

interface GetLimitUserInfoData {
  (userInfoObj: Netflix.UserInfo): Netflix.UserInfo;
}

export const error = {
  argumentRequired: 'argument object is required',
};

export const getLimitUserInfoData: GetLimitUserInfoData = (userInfoObj) => {
  if (!userInfoObj) {
    throw new Error(error.argumentRequired);
  }

  const { guid, membershipStatus, name, userGuid } = userInfoObj;

  return { guid, membershipStatus, name, userGuid };
};
