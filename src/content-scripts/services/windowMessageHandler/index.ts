import { NetflixConstants, WindowMessagingConstants } from '@constants';
import { devLog } from '@services';

import { checkWhichViewOfGuestOrMember } from '@content-scripts/services';

import { WindowMessageHandler } from './types';

const { CURRENT_MEMBER } = NetflixConstants;

const {
  START_TO_CHECK_WHICH_VIEW_OF_GUEST_OR_MEMBER,
  POST_NETFLIX_PROFILE_GATE_STATE,
  POST_NETFLIX_USER_INFO,
} = WindowMessagingConstants;

export const windowMessageHandler: WindowMessageHandler = (event) => {
  if (event.source !== window) {
    return 'not equal in the window both';
  }

  if (event.data && event.data.type && event.data.payload) {
    // devLog('Content script received:', event.data);

    switch (event.data.type) {
      case START_TO_CHECK_WHICH_VIEW_OF_GUEST_OR_MEMBER:
        devLog('Content script received:', event.data);

        if ('userInfo' in event.data.payload) {
          const guestOrMember = checkWhichViewOfGuestOrMember(
            event.data.payload
          );

          if (guestOrMember === CURRENT_MEMBER) {
            // what we need to do now? what is next thing for this.
            return guestOrMember;
          }

          return guestOrMember;
        }

        return false;

      case POST_NETFLIX_USER_INFO:
        devLog('Content script received:', event.data);
        if ('membershipStatus' in event.data.payload) {
          return event.data.payload;
        }
        return false;

      case POST_NETFLIX_PROFILE_GATE_STATE:
        devLog('Content script received:', event.data);
        if ('data' in event.data.payload) {
          return event.data.payload;
        }
        return false;

      default:
        return 'default';
    }
  }
};
