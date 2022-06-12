import React from 'react';
import ReactDOM from 'react-dom';

import OptionsApp from '@options/OptionsApp';
import devLog from '@services/devLog';

document.title = 'Options Page';
devLog('Options file');

ReactDOM.render(<OptionsApp />, document.getElementById('root'));
