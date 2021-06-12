import tempMessage from './temp-message';
import listenDOM from './listen-dom';
import renderPage from './renderPage';

window.addEventListener('load', () => {
  console.log('window loaded');

  tempMessage();
  listenDOM();

  renderPage();
});

export {};
