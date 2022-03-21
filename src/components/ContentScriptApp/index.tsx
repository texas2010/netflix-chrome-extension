import React from 'react';
import ReactDOM from 'react-dom';

const ContentScriptApp = () => {
  return <div>i am here now!</div>;
};

const appRender = () => {
  const appRoot = document.getElementById('nAppRoot') as Element;
  ReactDOM.render(<ContentScriptApp />, appRoot);
};

export default appRender;
