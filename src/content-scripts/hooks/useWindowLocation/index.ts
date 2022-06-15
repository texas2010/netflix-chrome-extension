import { useState, useEffect } from 'react';

import { hrefChangeEventListen } from '@content-scripts/services';
import { urlParse } from '@utils';

export const useWindowLocation = () => {
  const [rawURL, setRawURL] = useState<string>(window.location.href);

  useEffect(() => {
    const hrefChangedisconnect = hrefChangeEventListen(setRawURL);

    return (): void => {
      hrefChangedisconnect();
    };
  }, [rawURL]);

  return urlParse(rawURL);
};
