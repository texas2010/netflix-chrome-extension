import React from 'react';
import ReactDOM from 'react-dom';

import Popup from '../components/Popup';
import './index.css';
document.title = 'Popup Page';
console.log('popup file');

ReactDOM.render(<Popup />, document.getElementById('root'));
