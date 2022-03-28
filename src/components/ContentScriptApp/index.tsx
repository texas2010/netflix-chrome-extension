import React from 'react';
import useLocationPage from '../../hooks/useLocationPage';
import './index.css';

export const ContentScriptApp = () => {
  const locationPage = useLocationPage();

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>i am here now!</h1>
      <h2 style={{ textAlign: 'center' }}>SitePage: {locationPage}</h2>
    </>
  );
};

export default ContentScriptApp;
