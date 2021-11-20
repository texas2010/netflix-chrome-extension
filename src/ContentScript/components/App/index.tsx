/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import RoutePage from '../RoutePage';
import connectListenDom from './listen-dom';
import { StoreProvider, stateDefaultValue } from '../../store';

interface UserInfoDataI {
  name: string;
  membershipStatus: string;
  guid: string;
}

type SetCallBackType<T> = React.Dispatch<React.SetStateAction<T | null>>;

const messageEvent = (
  e: MessageEvent,
  setCallback: SetCallBackType<UserInfoDataI>
): void => {
  if (e.source !== window) return;

  if (e.data.type && e.data.type === 'USER_INFO_DATA') {
    // eslint-disable-next-line prettier/prettier
    const { name, membershipStatus } = e.data.data;
    setCallback(e.data.data);
    chrome.storage.sync.set(
      // eslint-disable-next-line prettier/prettier
      { 'n-user-info-data': { name, membershipStatus } }
    );
  }
};

// eslint-disable-next-line no-undef
const App = (): JSX.Element => {
  const [userInfoData, setUserInfoData] = useState<UserInfoDataI | null>(null);
  const [isUserInfoDataLoading, setUserInfoDataLoading] =
    useState<boolean>(false);
  const [sitePage, setSitePage] = useState<string>(document.location.href);

  useEffect(() => {
    window.addEventListener(
      'message',
      (e: MessageEvent) => {
        messageEvent(e, setUserInfoData);
      },
      false
    );
    setUserInfoDataLoading(true);
    return (): void => {
      window.removeEventListener(
        'message',
        (e: MessageEvent) => {
          messageEvent(e, setUserInfoData);
        },
        false
      );
    };
  }, []);

  useEffect(() => {
    const disconnect = connectListenDom(setSitePage);
    return (): void => {
      disconnect();
    };
  }, []);

  // eslint-disable-next-line prettier/prettier
  const { pathname, search, searchParams, href } = new URL(sitePage);

  if (userInfoData) {
    if (
      userInfoData.guid &&
      !userInfoData.membershipStatus.toLowerCase().includes('anon')
    ) {
      return (
        <>
          {/* User Logging */}
          <h1>{`href: ${href}`}</h1>
          <RoutePage
            pathname={pathname}
            search={search}
            searchParams={searchParams}
          />
        </>
      );
    }
    return <>{/* Guest */}</>;
  }
  return (
    <>
      {isUserInfoDataLoading && (
        // eslint-disable-next-line react/self-closing-comp
        <span className="user-info-data-loading"></span>
      )}
    </>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (): void => {
  const appRoot: Element | null = document.getElementById('n-app-root');
  if (appRoot) {
    ReactDOM.render(
      <StoreProvider
        initialState={stateDefaultValue}
        reducer={(state): any => state}
      >
        <App />
      </StoreProvider>,
      appRoot
    );
  }
};
