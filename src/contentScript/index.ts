import devLog from '../utils/devLog';
import isElementExist from '../utils/isElementExist';
import './index.css';

devLog('Content Script file');

window.addEventListener('load', async () => {
  devLog('window loaded');

  const mainAppRoot: Element = document.createElement('div');
  mainAppRoot.setAttribute('id', 'nAppRoot');

  const theirAppRoot: Element | null = document.getElementById('appMountPoint');
  if ((await isElementExist('#appMountPoint')) && theirAppRoot) {
    theirAppRoot.appendChild(mainAppRoot);
    devLog('nAppRoot added in the dom!');
    // render main app.
  }

  devLog('end of window loading.');
});
