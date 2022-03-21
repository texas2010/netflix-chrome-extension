import devLog from '../utils/devLog';
import isElementExist from '../utils/isElementExist';
import appRender from '../components/ContentScriptApp';
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
    appRender();
  }

  devLog('end of window loading.');
});
