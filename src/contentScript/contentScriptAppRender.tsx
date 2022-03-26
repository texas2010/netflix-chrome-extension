import ReactDOM from 'react-dom';

import ContentScriptApp from '../components/ContentScriptApp';

const contentScriptAppRender = () => {
  const appRoot = document.getElementById('nAppRoot') as Element;
  ReactDOM.render(<ContentScriptApp />, appRoot);
};

export default contentScriptAppRender;
