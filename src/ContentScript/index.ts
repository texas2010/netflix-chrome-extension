import tempMessage from './temp-message';
import listenDOM from './listen-dom';

window.addEventListener('load', () => {
  console.log('window loaded');

  tempMessage();
  listenDOM();

  if (document.location.pathname === '/browse/my-list') {
    // Install feature in the my list page.
    console.log('Installed feature in the my list page');
  }
});

export {};
