import { devLog } from '@services';

import {
  windowLoadHandler,
  windowMessageHandler,
} from '@content-scripts/services';

devLog('Content Script file');

devLog(new Date());

window.addEventListener('load', windowLoadHandler);
