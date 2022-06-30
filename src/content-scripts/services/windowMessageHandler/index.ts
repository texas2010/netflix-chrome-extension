import { NetflixConstants, WindowMessagingConstants } from '@constants';
import { devLog } from '@services';

import {
  checkWhichViewOfGuestOrMember,
  checkWhichViewOfProfilesGateOrMainView,
} from '@content-scripts/services';

import { WindowMessageHandler } from './types';

const {
  CURRENT_MEMBER,
  MAIN_VIEW,
  WHO_IS_WATCHING_VIEW,
  MANAGE_PROFILES_VIEW,
} = NetflixConstants;

const {
  START_TO_CHECK_WHICH_VIEW_OF_GUEST_OR_MEMBER,
  START_TO_CHECK_WHICH_VIEW_OF_MAIN_OR_OTHER,
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

        if (
          'userInfo' in event.data.payload &&
          'profileGateState' in event.data.payload
        ) {
          const guestOrMember = checkWhichViewOfGuestOrMember({
            userInfo: event.data.payload.userInfo,
          });

          if (guestOrMember === CURRENT_MEMBER) {
            window.postMessage(
              {
                type: START_TO_CHECK_WHICH_VIEW_OF_MAIN_OR_OTHER,
                payload: {
                  profileGateState: event.data.payload.profileGateState,
                },
              },
              '*'
            );
            return guestOrMember;
          }

          return guestOrMember;
        }

        return false;

      case START_TO_CHECK_WHICH_VIEW_OF_MAIN_OR_OTHER:
        devLog('Content script received:', event.data);

        if ('profileGateState' in event.data.payload) {
          const profilesGateOrMain = checkWhichViewOfProfilesGateOrMainView({
            profileGateState: event.data.payload.profileGateState,
          });
          devLog('profilesGateOrMain', profilesGateOrMain);

          if (!profilesGateOrMain) {
            return false;
          }

          switch (profilesGateOrMain) {
            case MAIN_VIEW:
              // start to install react views
              return MAIN_VIEW;

            case WHO_IS_WATCHING_VIEW:
              return WHO_IS_WATCHING_VIEW;

            case MANAGE_PROFILES_VIEW:
              return MANAGE_PROFILES_VIEW;

            default:
              return 'default';
          }
        }
        return false;

      case POST_NETFLIX_USER_INFO:
        devLog('Content script received:', event.data);
        if ('userInfo' in event.data.payload) {
          return event.data.payload;
        }
        return false;

      case POST_NETFLIX_PROFILE_GATE_STATE:
        devLog('Content script received:', event.data);
        if ('profileGateState' in event.data.payload) {
          return event.data.payload;
        }
        return false;

      default:
        return 'default';
    }
  }
};
