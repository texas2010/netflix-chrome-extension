import { useState, useEffect } from 'react';
import { hrefChangeEventListen } from '../../utils/hrefChangeEventListen';

const useLocationPage = () => {
  const [rawURL, setRawURL] = useState<string>(window.location.href);

  useEffect(() => {
    const hrefChangedisconnect = hrefChangeEventListen(setRawURL);

    return (): void => {
      hrefChangedisconnect();
    };
  }, [rawURL]);

  return rawURL;
};

export default useLocationPage;
