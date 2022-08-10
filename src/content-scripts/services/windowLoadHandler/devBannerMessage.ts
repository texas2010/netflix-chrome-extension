export const devBannerMessage = () => {
  const liEl = document.createElement('li');
  liEl.classList.add('navigation-tab');

  const messageEl = document.createElement('h2');
  messageEl.textContent = 'Netflix Chrome Extension is enabled!';

  liEl.appendChild(messageEl);
  document
    .querySelector('#appMountPoint ul.tabbed-primary-navigation')
    ?.appendChild(liEl);
};
