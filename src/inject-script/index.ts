/*
Do not use console.log function in this file. or this script will be broke and throw error.
*/

import { WindowMessagingConstants } from '@constants';
import { NetflixTypes } from '@types';

import { getLimitUserInfoData } from './getLimitUserInfoData';

const {
  START_TO_CHECK_WHICH_VIEW_OF_GUEST_OR_MEMBER,
  GET_NETFLIX_USER_INFO,
  POST_NETFLIX_USER_INFO,
  GET_NETFLIX_PROFILE_GATE_STATE,
  POST_NETFLIX_PROFILE_GATE_STATE,
} = WindowMessagingConstants;

declare global {
  interface Window {
    netflix: NetflixTypes.Global;
  }
}

console.log('injected script file');

window.postMessage(
  {
    type: START_TO_CHECK_WHICH_VIEW_OF_GUEST_OR_MEMBER,
    payload: {
      userInfo: getLimitUserInfoData(
        window.netflix.reactContext.models.userInfo.data
      ),
      profileGateState: window.netflix.reactContext.models.profileGateState,
    },
  },
  '*'
);

window.addEventListener('message', (event) => {
  // console.log('inject script windowMessageHandler');

  if (event.source !== window) {
    return;
  }

  if (event.data && event.data.type) {
    // console.log('inject script received:', event.data);

    switch (event.data.type) {
      case GET_NETFLIX_USER_INFO:
        console.log('inject script received:', event.data);
        window.postMessage(
          {
            type: POST_NETFLIX_USER_INFO,
            payload: getLimitUserInfoData(
              window.netflix.reactContext.models.userInfo.data
            ),
          },
          '*'
        );
        break;

      case GET_NETFLIX_PROFILE_GATE_STATE:
        console.log('inject script received:', event.data);
        window.postMessage(
          {
            type: POST_NETFLIX_PROFILE_GATE_STATE,
            payload: window.netflix.reactContext.models.profileGateState,
          },
          '*'
        );
        break;

      default:
        break;
    }
  }
});
