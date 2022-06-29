/*
Do not use devLog function in this file. or this script will be broke and throw error.
*/

import { WindowMessagingConstants } from '@constants';
import { NetflixTypes } from '@types';

import { getLimitUserInfoData } from '@inject-script/getLimitUserInfoData';
import { windowMessageHandler } from '@inject-script/windowMessageHandler';

const { START_TO_CHECK_WHICH_VIEW_OF_GUEST_OR_MEMBER } =
  WindowMessagingConstants;

declare global {
  interface Window {
    netflix: undefined | NetflixTypes.Global;
  }
}

if (process.env.NODE_ENV === 'development') {
  console.log('injected script file');
}

window.postMessage(
  {
    type: START_TO_CHECK_WHICH_VIEW_OF_GUEST_OR_MEMBER,
    payload: {
      userInfo: getLimitUserInfoData(
        window.netflix?.reactContext?.models?.userInfo?.data
      ),
      profileGateState: window.netflix?.reactContext?.models?.profileGateState,
    },
  },
  '*'
);

window.addEventListener('message', windowMessageHandler);
