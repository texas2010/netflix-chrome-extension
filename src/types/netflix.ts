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
  membershipStatus: 'CURRENT_MEMBER' | 'ANONYMOUS';
  name: string | null;
  userGuid: string | null; // each profile user id
}

export interface ProfileGateState {
  data: number;
}
