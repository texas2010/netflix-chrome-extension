import devLog from '@utils/devLog';
import isElementExist from '@utils/isElementExist';
import contentScriptAppRender from './contentScriptAppRender';
import devBannerMessage from './devBannerMessage';
import './index.css';

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
    contentScriptAppRender();
  }

  devLog('end of window loading.');
});
