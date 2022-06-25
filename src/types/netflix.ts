import { NetflixConstants } from '@constants';

const { ANONYMOUS, CURRENT_MEMBER } = NetflixConstants;

export interface Global {
  reactContext: {
    models: {
      profileGateState: ProfileGateState | undefined;
      userInfo: {
        data: UserInfo;
      };
    };
  };
}

export interface UserInfo {
  guid: string | null; // account user id
  membershipStatus: typeof ANONYMOUS | typeof CURRENT_MEMBER;
  name: string | null;
  userGuid: string | null; // each profile user id
}

export interface ProfileGateState {
  data: number;
}
