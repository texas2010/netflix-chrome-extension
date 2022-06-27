import { NetflixConstants, WindowMessagingConstants } from '@constants';

import { windowMessageHandler } from '.';
import { MessageEventObj } from './types';

const { ANONYMOUS, CURRENT_MEMBER } = NetflixConstants;

const { START_TO_CHECK_WHICH_VIEW_OF_GUEST_OR_MEMBER } =
  WindowMessagingConstants;

describe('windowMessageHandler function', () => {
  const inputObj: { data: MessageEventObj | undefined; source: typeof window } =
    {
      data: undefined,
      source: window,
    };

  beforeAll(() => {
    chrome.storage.local.set({ userSettings: { devLog: false } });
  });

  afterEach(() => {
    inputObj.data = undefined;
  });

  test('should get false when netflix data is not exist', () => {
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
});
