import devLog from '../utils/devLog';
import isElementExist from '../utils/isElementExist';
import './index.css';

devLog('Content Script file');

window.addEventListener('load', async () => {
  devLog('window loaded');

  const mainAppRoot: Element = document.createElement('div');
  mainAppRoot.setAttribute('id', 'nAppRoot');

  const theirAppRoot: Element | null = document.getElementById('appMountPoint');
  const isAppMountPointExist = await isElementExist('#appMountPoint');
  if (isAppMountPointExist) {
    if (theirAppRoot) {
      theirAppRoot.appendChild(mainAppRoot);
      // render main app.
    }
  }
  const isGalleryLockupsExist = await isElementExist('.galleryLockups');
  if (isGalleryLockupsExist) {
    console.log('I saw .galleryLockups element!');
  }
});
