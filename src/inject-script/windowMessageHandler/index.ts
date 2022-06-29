import { WindowMessagingConstants } from '@constants';

import { getLimitUserInfoData } from '@inject-script/getLimitUserInfoData';

import { WindowMessageHandler } from './types';

const {
  GET_NETFLIX_USER_INFO,
  POST_NETFLIX_USER_INFO,
  GET_NETFLIX_PROFILE_GATE_STATE,
  POST_NETFLIX_PROFILE_GATE_STATE,
} = WindowMessagingConstants;

export const windowMessageHandler: WindowMessageHandler = (event) => {
  if (event.source !== window) {
    return;
  }

  if (event.data && event.data.type) {
    // console.log('inject script received:', event.data);

    switch (event.data.type) {
      case GET_NETFLIX_USER_INFO:
        if (process.env.NODE_ENV === 'development') {
          console.log('inject script received:', event.data);
        }
        window.postMessage(
          {
            type: POST_NETFLIX_USER_INFO,
            payload: getLimitUserInfoData(
              window.netflix?.reactContext?.models?.userInfo?.data
            ),
          },
          '*'
        );
        return {
          type: GET_NETFLIX_USER_INFO,
          value: window.netflix?.reactContext?.models?.userInfo?.data,
        };

      case GET_NETFLIX_PROFILE_GATE_STATE:
        if (process.env.NODE_ENV === 'development') {
          console.log('inject script received:', event.data);
        }
        window.postMessage(
          {
            type: POST_NETFLIX_PROFILE_GATE_STATE,
            payload: window.netflix?.reactContext?.models?.profileGateState,
          },
          '*'
        );
        return {
          type: GET_NETFLIX_PROFILE_GATE_STATE,
          value: window.netflix?.reactContext?.models?.profileGateState,
        };

      default:
        return 'default';
    }
  }
};
