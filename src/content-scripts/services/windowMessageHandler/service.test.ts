import { NetflixConstants, WindowMessagingConstants } from '@constants';
import { screen } from '@testing-library/react';

import { windowMessageHandler } from '.';
import { MessageEventObj } from './types';

const { ANONYMOUS, CURRENT_MEMBER } = NetflixConstants;

const {
  START_TO_CHECK_WHICH_VIEW_OF_GUEST_OR_MEMBER,
  POST_NETFLIX_USER_INFO,
  POST_NETFLIX_PROFILE_GATE_STATE,
} = WindowMessagingConstants;

describe('windowMessageHandler in the content script', () => {
  beforeAll(() => {
    chrome.storage.local.set({ userSettings: { devLog: false } });
  });

  describe('function', () => {
    const inputObj: {
      data: MessageEventObj | undefined;
      source: typeof window;
    } = {
      data: undefined,
      source: window,
    };

    afterEach(() => {
      inputObj.data = undefined;
    });

    test('should have false when type is start to check which view of guest or member but netflix data is not exist', () => {
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
        payload: { data: 1 },
      };

      const expected = {
        data: 1,
      };

      const event = new MessageEvent<MessageEventObj>('message', inputObj);

      const result = windowMessageHandler(event);

      expect(result).toEqual(expected);
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
  });

  describe('Message Event Listener', () => {
    const inputObj: {
      data: MessageEventObj | undefined;
      source: typeof window;
    } = {
      data: undefined,
      source: window,
    };

    afterEach(() => {
      inputObj.data = undefined;
    });

    test('should have false when type is start to check which view of guest or member', () => {
      // Input object
      inputObj.data = {
        type: START_TO_CHECK_WHICH_VIEW_OF_GUEST_OR_MEMBER,
        payload: {
          userInfo: undefined,
          profileGateState: undefined,
        },
      };

      const messageEventObj = new MessageEvent('message', inputObj);

      // mock jest function
      const mockCallback = jest.fn((event) => windowMessageHandler(event));

      window.addEventListener('message', mockCallback);

      // Send Message
      window.dispatchEvent(messageEventObj);

      // checking expect
      expect(mockCallback.mock.results).toHaveLength(1);
      expect(mockCallback.mock.results[0].type).toBe('return');
      expect(mockCallback.mock.results[0].value).toBe(false);

      // Remove event Listener
      window.removeEventListener('message', mockCallback);
    });

    test('should have ANONYMOUS when type is start to check which view of guest or member', () => {
      // Input object
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

      const messageEventObj = new MessageEvent('message', inputObj);

      // mock jest function
      const mockCallback = jest.fn((event) => windowMessageHandler(event));

      window.addEventListener('message', mockCallback);

      // Send Message
      window.dispatchEvent(messageEventObj);

      // checking expect
      expect(mockCallback.mock.results).toHaveLength(1);
      expect(mockCallback.mock.results[0].type).toBe('return');
      expect(mockCallback.mock.results[0].value).toBe(ANONYMOUS);

      // Remove event Listener
      window.removeEventListener('message', mockCallback);
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

      const messageEventObj = new MessageEvent('message', inputObj);

      // mock jest function
      const mockCallback = jest.fn((event) => windowMessageHandler(event));

      window.addEventListener('message', mockCallback);

      // Send Message
      window.dispatchEvent(messageEventObj);

      // checking expect
      expect(mockCallback.mock.results).toHaveLength(1);
      expect(mockCallback.mock.results[0].type).toBe('return');
      expect(mockCallback.mock.results[0].value).toBe(CURRENT_MEMBER);

      // Remove event Listener
      window.removeEventListener('message', mockCallback);
    });

    test('should have netflix user info when input is getting netflix user info', () => {
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

      const messageEventObj = new MessageEvent('message', inputObj);

      // mock jest function
      const mockCallback = jest.fn((event) => windowMessageHandler(event));

      window.addEventListener('message', mockCallback);

      // Send Message
      window.dispatchEvent(messageEventObj);

      // checking expect
      expect(mockCallback.mock.results).toHaveLength(1);
      expect(mockCallback.mock.results[0].type).toBe('return');
      expect(mockCallback.mock.results[0].value).toEqual(expected);

      // Remove event Listener
      window.removeEventListener('message', mockCallback);
    });

    test('should have undefined when when input is getting netflix user info but netflix data is not exist', () => {
      inputObj.data = {
        type: POST_NETFLIX_USER_INFO,
        payload: undefined,
      };

      const messageEventObj = new MessageEvent('message', inputObj);

      // mock jest function
      const mockCallback = jest.fn((event) => windowMessageHandler(event));

      window.addEventListener('message', mockCallback);

      // Send Message
      window.dispatchEvent(messageEventObj);

      // checking expect
      expect(mockCallback.mock.results).toHaveLength(1);
      expect(mockCallback.mock.results[0].type).toBe('return');
      expect(mockCallback.mock.results[0].value).toBeUndefined();

      // Remove event Listener
      window.removeEventListener('message', mockCallback);
    });

    test('should have netflix profile gate state when input is getting for get netflix profile gate state', () => {
      inputObj.data = {
        type: POST_NETFLIX_PROFILE_GATE_STATE,
        payload: { data: 1 },
      };

      const expected = {
        data: 1,
      };

      const messageEventObj = new MessageEvent('message', inputObj);

      // mock jest function
      const mockCallback = jest.fn((event) => windowMessageHandler(event));

      window.addEventListener('message', mockCallback);

      // Send Message
      window.dispatchEvent(messageEventObj);

      // checking expect
      expect(mockCallback.mock.results).toHaveLength(1);
      expect(mockCallback.mock.results[0].type).toBe('return');
      expect(mockCallback.mock.results[0].value).toEqual(expected);

      // Remove event Listener
      window.removeEventListener('message', mockCallback);
    });

    test('should have undefined when input is getting netflix profile gate state but netflix data is not exist', () => {
      inputObj.data = {
        type: POST_NETFLIX_PROFILE_GATE_STATE,
        payload: undefined,
      };

      const messageEventObj = new MessageEvent('message', inputObj);

      // mock jest function
      const mockCallback = jest.fn((event) => windowMessageHandler(event));

      window.addEventListener('message', mockCallback);

      // Send Message
      window.dispatchEvent(messageEventObj);

      // checking expect
      expect(mockCallback.mock.results).toHaveLength(1);
      expect(mockCallback.mock.results[0].type).toBe('return');
      expect(mockCallback.mock.results[0].value).toBeUndefined();

      // Remove event Listener
      window.removeEventListener('message', mockCallback);
    });
  });
});
