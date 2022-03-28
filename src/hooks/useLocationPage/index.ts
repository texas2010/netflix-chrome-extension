import { useState, useEffect } from 'react';
import { hrefChangeEventListen } from '../../utils/hrefChangeEventListen';
import urlParse from '../../utils/urlParse';

const useLocationPage = () => {
  const [rawURL, setRawURL] = useState<string>(window.location.href);

  useEffect(() => {
    const hrefChangedisconnect = hrefChangeEventListen(setRawURL);

    return (): void => {
      hrefChangedisconnect();
    };
  }, [rawURL]);

  return urlParse(rawURL);
};

export default useLocationPage;
