import { devLog } from '@services';

import { injectScript } from '@content-scripts/services';

export const windowLoadHandler = () => {
  devLog('window loaded');

  injectScript('static/js/inject-script.js');

  devLog('end of window loading.');
};
