import tempMessage from './temp-message';
import appRender from './components/App';

// eslint-disable-next-line prettier/prettier
import { userInfoData } from './window-post-message';

import './style.scss';

window.addEventListener('load', () => {
  console.log('window loaded');
  const appRoot = document.createElement('div');
  const theirAppRoot: Element | null = document.getElementById('appMountPoint');
  appRoot.setAttribute('id', 'n-app-root');

  if (theirAppRoot) {
    tempMessage();
    userInfoData();

    theirAppRoot.appendChild(appRoot); // this code must be first before call app render
    appRender();
  }
});

export {};
