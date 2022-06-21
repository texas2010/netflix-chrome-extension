import { devLog } from '@services';

import { injectScript } from './services';

interface NetflixDataInterface {
  profileGateState:
    | undefined
    | {
        data: number;
      };
  userInfo: {
    membershipStatus: string;
    guid: string | null;
    name: string | null;
    userGuid: string | null;
  };
}

const port = chrome.runtime.connect();

const checkWhichViewOfGuestOrMember = (netflixData: NetflixDataInterface) => {
  // checking the view of non-logged-in(guest) or logged-in(member)
  const {
    userInfo: { membershipStatus, guid },
  } = netflixData;

  if (membershipStatus.toLowerCase() === 'anonymous' && !guid) {
    // this is a non-logged-in and we don't need to do anything.
    console.log('this is a non-logged-in');
  } else if (membershipStatus.toLowerCase() === 'current_member' && !!guid) {
    // this is a logged-in. Next thing is checking view of logged-in.
    console.log('this is a logged-in');
  } else {
    devLog(
      'checkWhichViewOfGuestOrMember function',
      'something wrong with this.'
    );
  }
};

export const windowLoadHandler = () => {
  devLog('window loaded');

  injectScript('static/js/inject-script.js');

  port.onMessage.addListener((message) => {
    switch (message.type) {
      default:
        console.log('global:', message);
        break;
    }
  });

  window.addEventListener('message', (event) => {
    if (event.source !== window) {
      return;
    }

    if (event.data && event.data.type) {
      // console.log('Content script received:', event.data);

      switch (event.data.type) {
        case 'START_TO_CHECK_WHICH_VIEW_OF_GUEST_OR_MEMBER':
          console.log('Content script received:', event.data);
          checkWhichViewOfGuestOrMember(event.data.result);
          break;

        case 'POST_NETFLIX_USER_INFO':
          console.log('Content script received:', event.data);
          break;

        case 'POST_NETFLIX_PROFILE_GATE_STATE':
          console.log('Content script received:', event.data);
          break;

        default:
          break;
      }
    }
  });

  devLog('end of window loading.');
};
