import React from 'react';
import ReactDOM from 'react-dom';

import OptionsPage from '../components/OptionsPage';
import devLog from '../utils/devLog';

document.title = 'Options Page';
devLog('Options file');

ReactDOM.render(<OptionsPage />, document.getElementById('root'));
