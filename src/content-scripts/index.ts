import { devLog } from '@services';
// import { isElementExist } from '@content-scripts/services';
// import { devBannerMessage } from './devBannerMessage';
// import { appRender } from './App';

const port = chrome.runtime.connect();

devLog('Content Script file');

devLog(new Date());

window.addEventListener('load', async () => {
  devLog('window loaded');

  const injectScript = (filePath: string, element = 'body') => {
    const bodyEl = document.getElementsByTagName(element)[0];
    const scriptEl = document.createElement('script');
    scriptEl.setAttribute('type', 'text/javascript');
    scriptEl.setAttribute('src', filePath);
    bodyEl.appendChild(scriptEl);
  };

  injectScript(chrome.runtime.getURL('static/js/inject-script.js'));

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
});

port.onMessage.addListener((message) => {
  switch (message.type) {
    default:
      console.log(message);
      break;
  }
});
