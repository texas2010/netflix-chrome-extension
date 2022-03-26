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
    <div>
      <h1 style={{ textAlign: 'center' }}>i am here now!</h1>
      <h1 style={{ textAlign: 'center' }}>{sitePage}</h1>
    </div>
  );
};

export default ContentScriptApp;
