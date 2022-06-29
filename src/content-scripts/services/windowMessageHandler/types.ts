import { WindowMessagingConstants } from '@constants';
import { NetflixTypes } from '@types';

const {
  START_TO_CHECK_WHICH_VIEW_OF_GUEST_OR_MEMBER,
  POST_NETFLIX_PROFILE_GATE_STATE,
  POST_NETFLIX_USER_INFO,
} = WindowMessagingConstants;

type MessageEventDataType =
  | typeof START_TO_CHECK_WHICH_VIEW_OF_GUEST_OR_MEMBER
  | typeof POST_NETFLIX_PROFILE_GATE_STATE
  | typeof POST_NETFLIX_USER_INFO;

type MessageEventDataPayload =
  | {
      userInfo: NetflixTypes.UserInfo | undefined;
      profileGateState: NetflixTypes.ProfileGateState | undefined;
    }
  | NetflixTypes.ProfileGateState
  | NetflixTypes.UserInfo
  | undefined;

type MessageEventReturned =
  | undefined
  | false
  | string
  | NetflixTypes.AnonymousOrCurrentMember
  | NetflixTypes.ProfileGateState
  | NetflixTypes.UserInfo;

export interface MessageEventObj {
  type: MessageEventDataType;
  payload: MessageEventDataPayload;
}

export interface WindowMessageHandler {
  (event: MessageEvent<MessageEventObj>): MessageEventReturned;
}
