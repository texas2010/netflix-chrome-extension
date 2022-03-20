import devLog from '../utils/devLog';
import './index.css';

devLog('Content Script file');

window.addEventListener('load', () => {
  devLog('window loaded');
});

export {};
