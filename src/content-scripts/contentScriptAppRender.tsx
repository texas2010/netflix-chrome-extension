import ReactDOM from 'react-dom';

import ContentScriptApp from '@content-scripts/views/ContentScriptApp';

const contentScriptAppRender = () => {
  const appRoot = document.getElementById('nAppRoot') as Element;
  ReactDOM.render(<ContentScriptApp />, appRoot);
};

export default contentScriptAppRender;
