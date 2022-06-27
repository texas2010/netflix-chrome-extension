import { NetflixTypes } from '@types';

type Returned = NetflixTypes.AnonymousOrCurrentMember | false;

interface NetflixDataParameter {
  userInfo: NetflixTypes.UserInfo | undefined;
  profileGateState: NetflixTypes.ProfileGateState | undefined;
}

export interface CheckWhichOfGuestOrMember {
  (netflixData: NetflixDataParameter): Returned;
}
