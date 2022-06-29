import { NetflixConstants, WindowMessagingConstants } from '@constants';

import { windowMessageHandler } from './index';
import { MessageEventObj } from './types';

const { GET_NETFLIX_USER_INFO, GET_NETFLIX_PROFILE_GATE_STATE } =
  WindowMessagingConstants;

const { ANONYMOUS, CURRENT_MEMBER } = NetflixConstants;

describe('windowMessageHandler function in the inject script', () => {
  const inputObj: {
    data: MessageEventObj | undefined;
    source: typeof window;
  } = {
    data: undefined,
    source: window,
  };

  afterEach(() => {
    inputObj.data = undefined;
    window.netflix = undefined;
  });

  test('should have type GET_NETFLIX_USER_INFO when the content script requested to get netflix user info', () => {
    inputObj.data = {
      type: GET_NETFLIX_USER_INFO,
    };

    const expected = { type: GET_NETFLIX_USER_INFO };

    const messageEventObj = new MessageEvent('message', inputObj);

    const result = windowMessageHandler(messageEventObj);

    expect(result).toEqual(expected);
  });

  test('should have type GET_NETFLIX_USER_INFO and value is undefined when the content script requested to get netflix user info', () => {
    inputObj.data = {
      type: GET_NETFLIX_USER_INFO,
    };

    const expected = { type: GET_NETFLIX_USER_INFO, value: undefined };

    const messageEventObj = new MessageEvent('message', inputObj);

    const result = windowMessageHandler(messageEventObj);

    expect(result).toStrictEqual(expected);
  });

  test('should have type: GET_NETFLIX_USER_INFO and value have user info(ANONYMOUS) when the content script requested to get netflix user info', () => {
    inputObj.data = {
      type: GET_NETFLIX_USER_INFO,
    };
    window.netflix = {
      reactContext: {
        models: {
          userInfo: {
            data: {
              guid: null,
              membershipStatus: ANONYMOUS,
              name: null,
              userGuid: null,
            },
          },
        },
      },
    };

    const expected = {
      type: GET_NETFLIX_USER_INFO,
      value: {
        guid: null,
        membershipStatus: ANONYMOUS,
        name: null,
        userGuid: null,
      },
    };

    const messageEventObj = new MessageEvent('message', inputObj);

    const result = windowMessageHandler(messageEventObj);

    expect(result).toStrictEqual(expected);
  });

  test('should have type: GET_NETFLIX_USER_INFO and value have user info(CURRENT_MEMBER) when the content script requested to get netflix user info', () => {
    inputObj.data = {
      type: GET_NETFLIX_USER_INFO,
    };
    window.netflix = {
      reactContext: {
        models: {
          userInfo: {
            data: {
              guid: 'fake id string',
              membershipStatus: CURRENT_MEMBER,
              name: 'John Smith',
              userGuid: 'fake id string',
            },
          },
        },
      },
    };

    const expected = {
      type: GET_NETFLIX_USER_INFO,
      value: {
        guid: 'fake id string',
        membershipStatus: CURRENT_MEMBER,
        name: 'John Smith',
        userGuid: 'fake id string',
      },
    };

    const messageEventObj = new MessageEvent('message', inputObj);

    const result = windowMessageHandler(messageEventObj);

    expect(result).toStrictEqual(expected);
  });

  test('should have type: GET_NETFLIX_PROFILE_GATE_STATE when the content script requested to get netflix profile gate state', () => {
    inputObj.data = {
      type: GET_NETFLIX_PROFILE_GATE_STATE,
    };

    const expected = { type: GET_NETFLIX_PROFILE_GATE_STATE };

    const messageEventObj = new MessageEvent('message', inputObj);

    const result = windowMessageHandler(messageEventObj);

    expect(result).toEqual(expected);
  });

  test('should have type: GET_NETFLIX_PROFILE_GATE_STATE and value is undefined when the content script requested to get netflix profile gate state', () => {
    inputObj.data = {
      type: GET_NETFLIX_PROFILE_GATE_STATE,
    };

    const expected = { type: GET_NETFLIX_PROFILE_GATE_STATE, value: undefined };

    const messageEventObj = new MessageEvent('message', inputObj);

    const result = windowMessageHandler(messageEventObj);

    expect(result).toEqual(expected);
  });

  test('should have type: GET_NETFLIX_PROFILE_GATE_STATE and value have profile gate state when the content script requested to get netflix profile gate state', () => {
    inputObj.data = {
      type: GET_NETFLIX_PROFILE_GATE_STATE,
    };
    window.netflix = {
      reactContext: {
        models: {
          profileGateState: {
            data: 0,
          },
          userInfo: {
            data: {
              guid: 'fake id string',
              membershipStatus: CURRENT_MEMBER,
              name: 'John Smith',
              userGuid: 'fake id string',
            },
          },
        },
      },
    };

    const expected = {
      type: GET_NETFLIX_PROFILE_GATE_STATE,
      value: { data: 0 },
    };

    const messageEventObj = new MessageEvent('message', inputObj);

    const result = windowMessageHandler(messageEventObj);

    expect(result).toEqual(expected);
  });
});
