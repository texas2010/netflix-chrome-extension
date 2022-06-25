import { devLog } from '@services';
import { NetflixTypes } from '@types';

interface CheckWhichOfGuestOrMember {
  (netflixData: {
    userInfo: NetflixTypes.UserInfo;
    profileGateState: NetflixTypes.ProfileGateState | undefined;
  }): undefined | 'MEMBER';
}

export const error = {
  arugmentRequired: 'arugment object is required',
};

export const checkWhichViewOfGuestOrMember: CheckWhichOfGuestOrMember = (
  netflixData
) => {
  if (!netflixData) {
    throw new Error(error.arugmentRequired);
  }

  // checking the view of non-logged-in(guest) or logged-in(member)
  const {
    userInfo: { membershipStatus, guid },
  } = netflixData;

  if (membershipStatus === 'ANONYMOUS' && !guid) {
    // this is a non-logged-in and we don't need to do anything.
    devLog('this is a non-logged-in');
    return undefined;
  } else if (membershipStatus === 'CURRENT_MEMBER' && !!guid) {
    // this is a logged-in. Next thing is checking view of logged-in.
    devLog('this is a logged-in');
    return 'MEMBER';
  } else {
    devLog(
      'checkWhichViewOfGuestOrMember function',
      'something wrong with this.'
    );
    return undefined;
  }
};
