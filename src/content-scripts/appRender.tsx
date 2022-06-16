import ReactDOM from 'react-dom';

import { App } from './views/App';

export const appRender = () => {
  const appRoot = document.getElementById('nAppRoot') as Element;
  ReactDOM.render(<App />, appRoot);
};
