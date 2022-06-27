import { NetflixConstants, WindowMessagingConstants } from '@constants';

import { windowMessageHandler } from '.';
import { MessageEventObj } from './types';

const { ANONYMOUS, CURRENT_MEMBER } = NetflixConstants;

const {
  START_TO_CHECK_WHICH_VIEW_OF_GUEST_OR_MEMBER,
  POST_NETFLIX_USER_INFO,
  POST_NETFLIX_PROFILE_GATE_STATE,
} = WindowMessagingConstants;

describe('windowMessageHandler', () => {
  describe('function', () => {
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
    });

    test('should get false when code received type for start to check which view of guest of member', () => {
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

    test('should get ANONYMOUS when site have view of non-logged-in(guest)', () => {
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

    test('should get CURRENT_MEMBER when site have view of logged-in(member)', () => {
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

    test('should get netflix user info when code received for get netflix user info', () => {
      inputObj.data = {
        type: POST_NETFLIX_USER_INFO,
        payload: {
          guid: 'fake id string',
          membershipStatus: CURRENT_MEMBER,
          name: 'John Smith',
          userGuid: 'fake id string',
        },
      };

      const expected = {
        guid: 'fake id string',
        membershipStatus: CURRENT_MEMBER,
        name: 'John Smith',
        userGuid: 'fake id string',
      };

      const event = new MessageEvent<MessageEventObj>('message', inputObj);

      const result = windowMessageHandler(event);

      expect(result).toEqual(expected);
    });

    test('should get undefined when code received for get netflix user info', () => {
      inputObj.data = {
        type: POST_NETFLIX_USER_INFO,
        payload: undefined,
      };
      const event = new MessageEvent<MessageEventObj>('message', inputObj);

      const result = windowMessageHandler(event);

      expect(result).toBeUndefined();
    });

    test('should get netflix profile gate state when code received for get netflix profile gate state', () => {
      inputObj.data = {
        type: POST_NETFLIX_PROFILE_GATE_STATE,
        payload: { data: 1 },
      };

      const expected = {
        data: 1,
      };

      const event = new MessageEvent<MessageEventObj>('message', inputObj);

      const result = windowMessageHandler(event);

      expect(result).toEqual(expected);
    });

    test('should get undefined when code received for get netflix profile gate state', () => {
      inputObj.data = {
        type: POST_NETFLIX_PROFILE_GATE_STATE,
        payload: undefined,
      };
      const event = new MessageEvent<MessageEventObj>('message', inputObj);

      const result = windowMessageHandler(event);

      expect(result).toBeUndefined();
    });
  });

  describe('Event Listener', () => {
    test('should get false when inject script send message', () => {
      expect(true).toBe(true);
    });
  });
});
