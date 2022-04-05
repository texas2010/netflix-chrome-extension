import React from 'react';
import ReactDOM from 'react-dom';

import PopupApp from '@components/PopupApp';
import devLog from '@utils/devLog';

document.title = 'Popup Page';
devLog('popup file');

ReactDOM.render(<PopupApp />, document.getElementById('root'));
