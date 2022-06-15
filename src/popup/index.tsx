import React from 'react';
import ReactDOM from 'react-dom';

import PopupApp from '@popup/PopupApp';
import { devLog } from '@services';

document.title = 'Popup Page';
devLog('popup file');

ReactDOM.render(<PopupApp />, document.getElementById('root'));
