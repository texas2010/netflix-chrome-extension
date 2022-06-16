import React from 'react';

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
