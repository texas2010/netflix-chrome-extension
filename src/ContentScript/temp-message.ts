// eslint-disable-next-line import/no-anonymous-default-export
export default (): void => {
  console.log('Hello World from content script', new Date());

  const liEl = document.createElement('li');
  liEl.classList.add('navigation-tab');

  const messageEl = document.createElement('h2');
  messageEl.textContent = 'Netflix Feature is on!';

  liEl.appendChild(messageEl);
  document
    .querySelector('#appMountPoint ul.tabbed-primary-navigation')
    ?.appendChild(liEl);
};
