import { WindowMessagingConstants, NetflixConstants } from '@constants';
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
      // devLog('Content script received:', event.data);

      switch (event.data.type) {
        case START_TO_CHECK_WHICH_VIEW_OF_GUEST_OR_MEMBER:
          devLog('Content script received:', event.data);
          const guestOrMember = checkWhichViewOfGuestOrMember(
            event.data.result
          );
          if (guestOrMember === NetflixConstants.CURRENT_MEMBER) {
            // what we need to do now? what is next thing for this.
          }
          break;

        case POST_NETFLIX_USER_INFO:
          devLog('Content script received:', event.data);
          break;

        case POST_NETFLIX_PROFILE_GATE_STATE:
          devLog('Content script received:', event.data);
          break;

        default:
          break;
      }
    }
  });

  devLog('end of window loading.');
};
