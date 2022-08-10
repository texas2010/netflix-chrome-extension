import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { devLog } from '@services';
import { isElementExist } from '@content-scripts/services';
import { store } from '@content-scripts/store';

import { App } from './App';

export const appRender = (elementId: string) => {
  const appRoot = document.getElementById(elementId) as Element;

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    appRoot
  );
};

export const installReactView = async () => {
  const mainAppRoot = document.createElement('div');
  mainAppRoot.setAttribute('id', 'nAppRoot');

  const theirAppRoot = document.getElementById('appMountPoint');
  if ((await isElementExist('#appMountPoint')) && theirAppRoot) {
    theirAppRoot.appendChild(mainAppRoot);
    devLog('nAppRoot added in the dom!');
    appRender('nAppRoot');
  }
};
