// eslint-disable-next-line prettier/prettier
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface UserInfoDataI {
  name: string;
  membershipStatus: string;
}

type SetCallbackType = React.Dispatch<
  React.SetStateAction<UserInfoDataI | null>
>;

const messageEvent = (e: MessageEvent, setCallback: SetCallbackType): void => {
  if (e.source !== window) return;

  if (e.data.type && e.data.type === 'USER_INFO_DATA') {
    // eslint-disable-next-line prettier/prettier
    const { name, membershipStatus } = e.data.data;
    console.log('user info data', e.data.data);
    setCallback(e.data.data);
    chrome.storage.sync.set(
      // eslint-disable-next-line prettier/prettier
      { 'n-user-info-data': { name, membershipStatus } },
      () => {
        // eslint-disable-next-line prettier/prettier
        console.log(`Value is set to `, { name, membershipStatus });
      }
    );
  }
};

// eslint-disable-next-line no-undef
const App = (): JSX.Element => {
  const [userInfoData, setUserInfoData] = useState<UserInfoDataI | null>(null);
  const [isUserInfoDataLoading, setUserInfoDataLoading] =
    useState<boolean>(false);

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

  return (
    <>
      {isUserInfoDataLoading && (
        // eslint-disable-next-line react/self-closing-comp
        <span className="user-info-data-loading"></span>
      )}
      <h1>test message</h1>
      <p>some reason to leave this message on for test.</p>
      {userInfoData && <h2>{userInfoData.name}</h2>}
      {userInfoData && <h3>{userInfoData.membershipStatus}</h3>}
    </>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (): void => {
  const appRoot: Element | null = document.getElementById('n-app-root');
  if (appRoot) {
    ReactDOM.render(<App />, appRoot);
  }
};

// check if user logged in

// if (
//   userInfoData.guid &&
//   !userInfoData.membershipStatus.toLowerCase().includes('anon')
// ) {
//   // guid && membershipStatus.toLowerCase().includes('anon')
//   console.log('user is loggin');
// }
