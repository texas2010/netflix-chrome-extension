import ReactDOM from 'react-dom';

import { ContentScriptApp } from './views/ContentScriptApp';

export const contentScriptAppRender = () => {
  const appRoot = document.getElementById('nAppRoot') as Element;
  ReactDOM.render(<ContentScriptApp />, appRoot);
};
