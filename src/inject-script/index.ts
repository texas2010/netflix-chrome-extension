import { Netflix } from '@types';

import { getLimitUserInfoData } from './getLimitUserInfoData';

declare global {
  interface Window {
    netflix: Netflix.Global;
  }
}

console.log('injected script file');

window.postMessage(
  {
    type: 'START_TO_CHECK_WHICH_VIEW_OF_GUEST_OR_MEMBER',
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
    // console.log('inject script received:', event.data);

    switch (event.data.type) {
      case 'GET_NETFLIX_USER_INFO':
        window.postMessage(
          {
            type: 'POST_NETFLIX_USER_INFO',
            result: getLimitUserInfoData(
              window.netflix.reactContext.models.userInfo.data
            ),
          },
          '*'
        );
        break;

      case 'GET_NETFLIX_PROFILE_GATE_STATE':
        window.postMessage(
          {
            type: 'POST_NETFLIX_PROFILE_GATE_STATE',
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
