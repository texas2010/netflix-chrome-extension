import { NetflixConstants } from '@constants';
import { devLog } from '@services';

import { CheckWhichOfGuestOrMember } from './types';

const { ANONYMOUS, CURRENT_MEMBER } = NetflixConstants;

export const error = {
  arugmentRequired: 'arugment object is required',
};

export const checkWhichViewOfGuestOrMember: CheckWhichOfGuestOrMember = (
  netflixData
) => {
  // checking netflixData parameter if it is exist.
  if (!netflixData) {
    throw new Error(error.arugmentRequired);
  }
  // checking userInfo in the netflixData parameter if userinfo is undefined
  if (!netflixData.userInfo) {
    return undefined;
  }

  // checking the view of non-logged-in(guest) or logged-in(member)
  const {
    userInfo: { membershipStatus, guid },
  } = netflixData;

  if (membershipStatus === ANONYMOUS && !guid) {
    // this is a non-logged-in and we don't need to do anything.
    devLog('checkWhichViewOfGuestOrMember status:', membershipStatus);
    return membershipStatus;
  } else if (membershipStatus === CURRENT_MEMBER && !!guid) {
    // this is a logged-in. Next thing is checking view of logged-in.
    devLog('checkWhichViewOfGuestOrMember status:', membershipStatus);
    return membershipStatus;
  }
  devLog(
    `checkWhichViewOfGuestOrMember - something wrong with membershipStatus: `,
    netflixData
  );
  return undefined;
};
