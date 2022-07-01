import { NetflixConstants, WindowMessagingConstants } from '@constants';

import { windowMessageHandler } from '.';
import { MessageEventObj } from './types';

const {
  ANONYMOUS,
  CURRENT_MEMBER,
  MANAGE_PROFILES_VIEW,
  MAIN_VIEW,
  WHO_IS_WATCHING_VIEW,
} = NetflixConstants;

const {
  START_TO_CHECK_WHICH_VIEW_OF_GUEST_OR_MEMBER,
  START_TO_CHECK_WHICH_VIEW_OF_MAIN_OR_OTHER,
  POST_NETFLIX_USER_INFO,
  POST_NETFLIX_PROFILE_GATE_STATE,
} = WindowMessagingConstants;

describe('windowMessageHandler in the content script', () => {
  const inputObj: {
    data: MessageEventObj | undefined;
    source: typeof window;
  } = {
    data: undefined,
    source: window,
  };

  beforeAll(() => {
    chrome.storage.local.set({ userSettings: { devLog: false } });
  });

  afterEach(() => {
    inputObj.data = undefined;
    document.body.innerHTML = '';
  });

  test('should have false when input is start to check which view of guest or member but netflix data is not exist', () => {
    inputObj.data = {
      type: START_TO_CHECK_WHICH_VIEW_OF_GUEST_OR_MEMBER,
      payload: {
        userInfo: undefined,
        profileGateState: undefined,
      },
    };

    const event = new MessageEvent<MessageEventObj>('message', inputObj);

    const result = windowMessageHandler(event);

    expect(result).toBe(false);
  });

  test('should have ANONYMOUS when type is start to check which view of guest or member', () => {
    inputObj.data = {
      type: START_TO_CHECK_WHICH_VIEW_OF_GUEST_OR_MEMBER,
      payload: {
        userInfo: {
          guid: null,
          membershipStatus: ANONYMOUS,
          name: null,
          userGuid: null,
        },
        profileGateState: undefined,
      },
    };

    const event = new MessageEvent<MessageEventObj>('message', inputObj);

    const result = windowMessageHandler(event);

    expect(result).toBe(ANONYMOUS);
  });

  test('should have CURRENT_MEMBER when type is start to check which view of guest or member', () => {
    inputObj.data = {
      type: START_TO_CHECK_WHICH_VIEW_OF_GUEST_OR_MEMBER,
      payload: {
        userInfo: {
          guid: 'fake id string',
          membershipStatus: CURRENT_MEMBER,
          name: 'John Smith',
          userGuid: 'fake id string',
        },
        profileGateState: undefined,
      },
    };

    const event = new MessageEvent<MessageEventObj>('message', inputObj);

    const result = windowMessageHandler(event);

    expect(result).toBe(CURRENT_MEMBER);
  });

  test('should have netflix user info when input is getting netflix user info', () => {
    inputObj.data = {
      type: POST_NETFLIX_USER_INFO,
      payload: {
        userInfo: {
          guid: 'fake id string',
          membershipStatus: CURRENT_MEMBER,
          name: 'John Smith',
          userGuid: 'fake id string',
        },
      },
    };

    const expected = {
      userInfo: {
        guid: 'fake id string',
        membershipStatus: CURRENT_MEMBER,
        name: 'John Smith',
        userGuid: 'fake id string',
      },
    };

    const event = new MessageEvent<MessageEventObj>('message', inputObj);

    const result = windowMessageHandler(event);

    expect(result).toStrictEqual(expected);
  });

  test('should have undefined when when input is getting netflix user info but netflix data is not exist', () => {
    inputObj.data = {
      type: POST_NETFLIX_USER_INFO,
      payload: undefined,
    };
    const event = new MessageEvent<MessageEventObj>('message', inputObj);

    const result = windowMessageHandler(event);

    expect(result).toBeUndefined();
  });

  test('should have netflix profile gate state when input is getting for get netflix profile gate state', () => {
    inputObj.data = {
      type: POST_NETFLIX_PROFILE_GATE_STATE,
      payload: {
        profileGateState: {
          data: 1,
        },
      },
    };

    const expected = {
      profileGateState: {
        data: 1,
      },
    };

    const event = new MessageEvent<MessageEventObj>('message', inputObj);

    const result = windowMessageHandler(event);

    expect(result).toStrictEqual(expected);
  });

  test('should have undefined when input is getting netflix profile gate state but netflix data is not exist', () => {
    inputObj.data = {
      type: POST_NETFLIX_PROFILE_GATE_STATE,
      payload: undefined,
    };
    const event = new MessageEvent<MessageEventObj>('message', inputObj);

    const result = windowMessageHandler(event);

    expect(result).toBeUndefined();
  });

  test('should have false when input is start to check to which view of profiles gate or main but profile gate state is not exist', () => {
    inputObj.data = {
      type: START_TO_CHECK_WHICH_VIEW_OF_MAIN_OR_OTHER,
      payload: {
        profileGateState: undefined,
      },
    };

    const event = new MessageEvent('message', inputObj);

    const result = windowMessageHandler(event);

    expect(result).toBe(false);
  });

  test('should have false when input is start to check to which view of profiles gate or main but profile gate state data is not exist', () => {
    inputObj.data = {
      type: START_TO_CHECK_WHICH_VIEW_OF_MAIN_OR_OTHER,
      payload: {
        profileGateState: {
          data: undefined,
        },
      },
    };

    const event = new MessageEvent('message', inputObj);

    const result = windowMessageHandler(event);

    expect(result).toBe(false);
  });

  test('should have view of main when input is start to check to which view of profiles gate or main', () => {
    const mainView = document.createElement('div');
    mainView.setAttribute('id', 'main-view');
    document.body.appendChild(mainView);

    inputObj.data = {
      type: START_TO_CHECK_WHICH_VIEW_OF_MAIN_OR_OTHER,
      payload: {
        profileGateState: {
          data: 0,
        },
      },
    };

    const event = new MessageEvent('message', inputObj);

    const result = windowMessageHandler(event);

    expect(result).toBe(MAIN_VIEW);
  });

  test('should have view of who is watching when input is start to check to which view of profiles gate or main', () => {
    const profilesGateContainer = document.createElement('div');
    profilesGateContainer.setAttribute('class', 'profiles-gate-container');
    document.body.appendChild(profilesGateContainer);

    inputObj.data = {
      type: START_TO_CHECK_WHICH_VIEW_OF_MAIN_OR_OTHER,
      payload: {
        profileGateState: {
          data: 1,
        },
      },
    };

    const event = new MessageEvent('message', inputObj);

    const result = windowMessageHandler(event);

    expect(result).toBe(WHO_IS_WATCHING_VIEW);
  });

  test('should have view of manage profiles when input is start to check to which view of profiles gate or main', () => {
    const profilesGateContainer = document.createElement('div');
    profilesGateContainer.setAttribute('class', 'profiles-gate-container');
    document.body.appendChild(profilesGateContainer);

    inputObj.data = {
      type: START_TO_CHECK_WHICH_VIEW_OF_MAIN_OR_OTHER,
      payload: {
        profileGateState: {
          data: 11,
        },
      },
    };

    const event = new MessageEvent('message', inputObj);

    const result = windowMessageHandler(event);

    expect(result).toBe(MANAGE_PROFILES_VIEW);
  });
});
