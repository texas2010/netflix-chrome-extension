import React from 'react';
import ReactDOM from 'react-dom';

import { devLog } from '@services';
import { PopupApp } from './PopupApp';

document.title = 'Popup Page';
devLog('popup file');

ReactDOM.render(<PopupApp />, document.getElementById('root'));
