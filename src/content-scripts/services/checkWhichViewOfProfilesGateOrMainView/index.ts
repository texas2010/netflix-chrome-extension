import { NetflixConstants } from '@constants';

const { MAIN_VIEW, WHO_IS_WATCHING_VIEW, MANAGE_PROFILES_VIEW } =
  NetflixConstants;

interface NetflixDataParameter {
  profileGateState:
    | undefined
    | {
        data: undefined | number;
      };
}

interface CheckWhichViewOfPRofilesGateOrMainView {
  (netflixData: undefined | NetflixDataParameter):
    | undefined
    | string
    | typeof MAIN_VIEW
    | typeof WHO_IS_WATCHING_VIEW
    | typeof MANAGE_PROFILES_VIEW;
}

export const checkWhichViewOfProfilesGateOrMainView: CheckWhichViewOfPRofilesGateOrMainView =
  (netflixData) => {
    // checking parameter and not accept any undefined if it is and return it early.
    if (
      !netflixData ||
      !netflixData.profileGateState ||
      typeof netflixData.profileGateState.data !== 'number'
    ) {
      return undefined;
    }

    // checking view of main
    if (
      netflixData.profileGateState.data === 0 &&
      document.querySelector('#main-view') &&
      !document.querySelector('.profiles-gate-container')
    ) {
      return MAIN_VIEW;
    }

    // checking view of who is watching
    if (
      netflixData.profileGateState.data === 1 &&
      !document.querySelector('#main-view') &&
      document.querySelector('.profiles-gate-container')
    ) {
      return WHO_IS_WATCHING_VIEW;
    }

    // checking view of manage profiles
    if (
      netflixData.profileGateState.data === 11 &&
      !document.querySelector('#main-view') &&
      document.querySelector('.profiles-gate-container')
    ) {
      return MANAGE_PROFILES_VIEW;
    }

    return 'default';
  };
