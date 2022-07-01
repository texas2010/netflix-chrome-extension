import { NetflixConstants } from '@constants';

import { checkWhichViewOfProfilesGateOrMainView } from './index';

const { MAIN_VIEW, WHO_IS_WATCHING_VIEW, MANAGE_PROFILES_VIEW } =
  NetflixConstants;

describe('checkWhichViewOfProfilesGateOrMainView function', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should have undefined when argument is undefined', () => {
    const result = checkWhichViewOfProfilesGateOrMainView(undefined);

    expect(result).toBeUndefined();
  });

  test('should have undefined when profileGateState is undefined', () => {
    const inputObj = {
      profileGateState: undefined,
    };

    const result = checkWhichViewOfProfilesGateOrMainView(inputObj);

    expect(result).toBeUndefined();
  });

  test('should have undefined when profileGateState data is undefined', () => {
    const inputObj = {
      profileGateState: {
        data: undefined,
      },
    };

    const result = checkWhichViewOfProfilesGateOrMainView(inputObj);

    expect(result).toBeUndefined();
  });

  test('should have view of main when view is a main view', () => {
    const mainView = document.createElement('div');
    mainView.setAttribute('id', 'main-view');
    document.body.appendChild(mainView);

    const inputObj = {
      profileGateState: {
        data: 0,
      },
    };

    const result = checkWhichViewOfProfilesGateOrMainView(inputObj);

    expect(result).toBe(MAIN_VIEW);
  });

  test('should have view of who is watching when view is a who is watching', () => {
    const profilesGateContainer = document.createElement('div');
    profilesGateContainer.setAttribute('class', 'profiles-gate-container');
    document.body.appendChild(profilesGateContainer);

    const inputObj = {
      profileGateState: {
        data: 1,
      },
    };

    const result = checkWhichViewOfProfilesGateOrMainView(inputObj);

    expect(result).toBe(WHO_IS_WATCHING_VIEW);
  });

  test('should have view of manage profiles when view is a manage profiles', () => {
    const profilesGateContainer = document.createElement('div');
    profilesGateContainer.setAttribute('class', 'profiles-gate-container');
    document.body.appendChild(profilesGateContainer);

    const inputObj = {
      profileGateState: {
        data: 11,
      },
    };

    const result = checkWhichViewOfProfilesGateOrMainView(inputObj);

    expect(result).toBe(MANAGE_PROFILES_VIEW);
  });
});
