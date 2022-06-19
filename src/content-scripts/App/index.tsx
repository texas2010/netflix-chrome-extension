import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

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
