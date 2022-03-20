import React from 'react';
import ReactDOM from 'react-dom';

import PopupPage from '../components/PopupPage';
import devLog from '../utils/devLog';

document.title = 'Popup Page';
devLog('popup file');

ReactDOM.render(<PopupPage />, document.getElementById('root'));
