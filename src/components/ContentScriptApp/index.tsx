import React, { useEffect, useState } from 'react';
import { hrefChangeEventListen } from '../../utils/hrefChangeEventListen';
import './index.css';

export const ContentScriptApp = () => {
  const [sitePage, setSitePage] = useState<string>(document.location.href);

  useEffect(() => {
    const hrefChangedisconnect = hrefChangeEventListen(setSitePage);
    return (): void => {
      hrefChangedisconnect();
    };
  }, [sitePage]);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>i am here now!</h1>
      <h2 style={{ textAlign: 'center' }}>SitePage: {sitePage}</h2>
    </>
  );
};

export default ContentScriptApp;
