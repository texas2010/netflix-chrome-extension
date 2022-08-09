import { NetflixConstants } from '@constants';

const { ANONYMOUS, CURRENT_MEMBER } = NetflixConstants;

export interface Global {
  reactContext: undefined | ReactContent;
}

interface ReactContent {
  models: undefined | Models;
}

interface Models {
  profileGateState?: undefined | ProfileGateState;
  userInfo:
    | undefined
    | {
        data: undefined | UserInfo;
      };
}

export interface UserInfo {
  guid: string | null; // account user id
  membershipStatus: AnonymousOrCurrentMember;
  name: string | null;
  userGuid: string | null; // each profile user id
}

export interface ProfileGateState {
  data: undefined | number;
}

export type AnonymousOrCurrentMember = typeof ANONYMOUS | typeof CURRENT_MEMBER;
