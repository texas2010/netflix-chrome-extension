import React from 'react';
import ReactDOM from 'react-dom';

const ContentScriptApp = () => {
  return <h1>i am here now!</h1>;
};

const appRender = () => {
  const appRoot = document.getElementById('nAppRoot') as Element;
  ReactDOM.render(<ContentScriptApp />, appRoot);
};

export default appRender;
