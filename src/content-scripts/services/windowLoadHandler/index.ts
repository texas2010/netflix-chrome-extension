import { devLog } from '@services';

import { injectScript } from '@content-scripts/services';

import { devBannerMessage } from './devBannerMessage';

export const windowLoadHandler = () => {
  devLog('window loaded');

  if (process.env.NODE_ENV === 'development') {
    devBannerMessage();
  }

  injectScript('static/js/inject-script.js');

  devLog('end of window loading.');
};
