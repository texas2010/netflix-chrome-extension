export interface Global {
  reactContext: {
    models: {
      profileGateState: undefined | ProfileGateState;
      userInfo: {
        data: UserInfo;
      };
    };
  };
}

export interface UserInfo {
  name: string | null;
  membershipStatus: string;
  guid: string | null; // account user id
  userGuid: string | null; // each profile user id
}

export interface ProfileGateState {
  data: number;
}
