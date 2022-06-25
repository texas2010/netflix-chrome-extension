import { devLog } from '@services';
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

devLog('injected script file');

window.postMessage(
  {
    type: START_TO_CHECK_WHICH_VIEW_OF_GUEST_OR_MEMBER,
    result: {
      userInfo: getLimitUserInfoData(
        window.netflix.reactContext.models.userInfo.data
      ),
      profileGateState: window.netflix.reactContext.models.profileGateState,
    },
  },
  '*'
);

window.addEventListener('message', (event) => {
  if (event.source !== window) {
    return;
  }

  if (event.data && event.data.type) {
    devLog('inject script received:', event.data);

    switch (event.data.type) {
      case GET_NETFLIX_USER_INFO:
        window.postMessage(
          {
            type: POST_NETFLIX_USER_INFO,
            result: getLimitUserInfoData(
              window.netflix.reactContext.models.userInfo.data
            ),
          },
          '*'
        );
        break;

      case GET_NETFLIX_PROFILE_GATE_STATE:
        window.postMessage(
          {
            type: POST_NETFLIX_PROFILE_GATE_STATE,
            result: window.netflix.reactContext.models.profileGateState,
          },
          '*'
        );
        break;

      default:
        break;
    }
  }
});
