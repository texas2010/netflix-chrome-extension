import { WindowMessagingConstants } from '@constants';
import { devLog } from '@services';

import { checkWhichViewOfGuestOrMember, injectScript } from './services';

const {
  START_TO_CHECK_WHICH_VIEW_OF_GUEST_OR_MEMBER,
  POST_NETFLIX_PROFILE_GATE_STATE,
  POST_NETFLIX_USER_INFO,
} = WindowMessagingConstants;

export const windowLoadHandler = () => {
  devLog('window loaded');

  injectScript('static/js/inject-script.js');

  window.addEventListener('message', (event) => {
    if (event.source !== window) {
      return;
    }

    if (event.data && event.data.type) {
      // console.log('Content script received:', event.data);

      switch (event.data.type) {
        case START_TO_CHECK_WHICH_VIEW_OF_GUEST_OR_MEMBER:
          console.log('Content script received:', event.data);
          checkWhichViewOfGuestOrMember(event.data.result);
          break;

        case POST_NETFLIX_USER_INFO:
          console.log('Content script received:', event.data);
          break;

        case POST_NETFLIX_PROFILE_GATE_STATE:
          console.log('Content script received:', event.data);
          break;

        default:
          break;
      }
    }
  });

  devLog('end of window loading.');
};
