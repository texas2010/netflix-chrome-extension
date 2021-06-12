import tempMessage from './temp-message';
import listenDOM from './listen-dom';
import renderPage from './renderPage';

window.addEventListener('load', () => {
  const netflixContainer: Element | null | undefined =
    document.querySelector('.mainView')?.parentElement;
  const myListParentElement: Element = document.createElement('div');
  myListParentElement.setAttribute('id', 'my-list-parent-root');

  console.log('window loaded');

  tempMessage();
  listenDOM();

  if (netflixContainer) {
    netflixContainer.appendChild(myListParentElement);
  }

  renderPage();
});

export {};
