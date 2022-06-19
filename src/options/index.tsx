import ReactDOM from 'react-dom';

import { devLog } from '@services';
import { OptionsApp } from './OptionsApp';

document.title = 'Options Page';
devLog('Options file');

ReactDOM.render(<OptionsApp />, document.getElementById('root'));
