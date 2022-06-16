import { devLog } from '@services';
import { isElementExist } from '@content-scripts/services';

import { devBannerMessage } from './devBannerMessage';
import { appRender } from './App';

devLog('Content Script file');

window.addEventListener('load', async () => {
  devLog('window loaded');

  if (process.env.NODE_ENV === 'development') {
    devBannerMessage();
  }

  const mainAppRoot = document.createElement('div');
  mainAppRoot.setAttribute('id', 'nAppRoot');

  const theirAppRoot: Element | null = document.getElementById('appMountPoint');
  if ((await isElementExist('#appMountPoint')) && theirAppRoot) {
    theirAppRoot.appendChild(mainAppRoot);
    devLog('nAppRoot added in the dom!');
    appRender('nAppRoot');
  }

  devLog('end of window loading.');
});
