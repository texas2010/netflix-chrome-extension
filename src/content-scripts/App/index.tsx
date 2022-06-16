import React from 'react';
import ReactDOM from 'react-dom';

import { useWindowLocation } from '@content-scripts/hooks';

import './style.css';

export const App = () => {
  const locationPage = useWindowLocation();

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>i am here now!</h1>
      <h2 style={{ textAlign: 'center' }}>
        SitePage: {locationPage.originUrl}
      </h2>
    </>
  );
};

export const appRender = (elementId: string) => {
  const appRoot = document.getElementById(elementId) as Element;
  ReactDOM.render(<App />, appRoot);
};
