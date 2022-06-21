import { devLog } from '@services';
import { injectScript } from './services';
// import { isElementExist } from '@content-scripts/services';
// import { devBannerMessage } from './devBannerMessage';
// import { appRender } from './App';

const port = chrome.runtime.connect();

export const windowLoadHandler = async () => {
  devLog('window loaded');

  injectScript('static/js/inject-script.js');

  port.onMessage.addListener((message) => {
    switch (message.type) {
      default:
        console.log(message);
        break;
    }
  });

  window.addEventListener('message', (event) => {
    if (event.source !== window) {
      return;
    }

    if (event.data && event.data.type) {
      // console.log('Content script received:', event.data);

      switch (event.data.type) {
        case 'NETFLIX_USER_INFO_DATA':
          console.log('Content script received:', event.data);
          break;
        case 'NETFLIX_PROFILE_GATE_STATE_DATA':
          console.log('Content script received:', event.data);
          break;
        default:
          break;
      }
    }
  });

  // if (process.env.NODE_ENV === 'development') {
  //   devBannerMessage();
  // }

  // const mainAppRoot = document.createElement('div');
  // mainAppRoot.setAttribute('id', 'nAppRoot');

  // const theirAppRoot: Element | null = document.getElementById('appMountPoint');
  // if ((await isElementExist('#appMountPoint')) && theirAppRoot) {
  //   theirAppRoot.appendChild(mainAppRoot);
  //   devLog('nAppRoot added in the dom!');
  //   appRender('nAppRoot');
  // }

  devLog('end of window loading.');
};
