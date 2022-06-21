import { devLog } from '@services';
import { windowLoadHandler } from './windowLoadHandler';

devLog('Content Script file');

devLog(new Date());

window.addEventListener('load', windowLoadHandler);
