import { NetflixConstants } from '@constants';
import { NetflixTypes } from '@types';

const { ANONYMOUS, CURRENT_MEMBER } = NetflixConstants;

type Returned = typeof ANONYMOUS | typeof CURRENT_MEMBER | undefined;

interface NetflixDataParameter {
  userInfo: NetflixTypes.UserInfo | undefined;
  profileGateState: NetflixTypes.ProfileGateState | undefined;
}

export interface CheckWhichOfGuestOrMember {
  (netflixData: NetflixDataParameter): Returned;
}
