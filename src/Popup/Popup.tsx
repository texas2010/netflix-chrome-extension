import React from 'react';
// eslint-disable-next-line prettier/prettier
import { browser, Tabs } from 'webextension-polyfill-ts';

import './styles.scss';

function openWebPage(url: string): Promise<Tabs.Tab> {
  // eslint-disable-next-line prettier/prettier
  return browser.tabs.create({ url });
}

const Popup: React.FC = () => {
  return (
    <section id="popup">
      <h2>Hello Netflix</h2>
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
