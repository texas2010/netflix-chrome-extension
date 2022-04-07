import React from 'react';
import ReactDOM from 'react-dom';

import OptionsApp from '@components/OptionsApp';
import devLog from '@utils/devLog';

document.title = 'Options Page';
devLog('Options file');

ReactDOM.render(<OptionsApp />, document.getElementById('root'));
