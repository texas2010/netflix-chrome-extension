import { NetflixTypes } from '@types';
import { WindowMessagingConstants } from '@constants';

const { GET_NETFLIX_USER_INFO, GET_NETFLIX_PROFILE_GATE_STATE } =
  WindowMessagingConstants;

export interface MessageEventObj {
  type: typeof GET_NETFLIX_USER_INFO | typeof GET_NETFLIX_PROFILE_GATE_STATE;
}

type MessageEventReturned =
  | undefined
  | string
  | {
      type:
        | typeof GET_NETFLIX_USER_INFO
        | typeof GET_NETFLIX_PROFILE_GATE_STATE;
      value: undefined | NetflixTypes.UserInfo | NetflixTypes.ProfileGateState;
    };

export interface WindowMessageHandler {
  (event: MessageEvent<MessageEventObj>): MessageEventReturned;
}
