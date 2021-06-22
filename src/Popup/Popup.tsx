// eslint-disable-next-line prettier/prettier
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line prettier/prettier
import { browser, Tabs } from 'webextension-polyfill-ts';

import './styles.scss';

interface UserInfoDataI {
  name: string;
  membershipStatus: string;
}

function openWebPage(url: string): Promise<Tabs.Tab> {
  // eslint-disable-next-line prettier/prettier
  return browser.tabs.create({ url });
}

const Popup: React.FC = () => {
  const [userInfoData, setUserInfoData] = useState<UserInfoDataI | null>(null);

  const userInfoDataListener = (change: {
    [key: string]: chrome.storage.StorageChange;
  }): void => {
    if ('n-user-info-data' in change) {
      setUserInfoData(change['n-user-info-data'].newValue);
    }
  };

  const getUserInfoData = (data: UserInfoDataI | null): string => {
    if (data) {
      if (data.name) {
        return data.name;
      }
      return 'guest';
    }
    return 'guest';
  };

  useEffect(() => {
    chrome.storage.sync.get((result) => {
      if ('n-user-info-data' in result) {
        setUserInfoData(result['n-user-info-data']);
      }
    });
    chrome.storage.onChanged.addListener(userInfoDataListener);
    return (): void => {
      chrome.storage.onChanged.removeListener(userInfoDataListener);
    };
  }, []);

  return (
    <section id="popup">
      <h2>Hello {getUserInfoData(userInfoData)}</h2>
      <button
        id="options__button"
        type="button"
        onClick={(): Promise<Tabs.Tab> => {
          return openWebPage('options.html');
        }}
      >
        Options Page
      </button>
    </section>
  );
};

export default Popup;
