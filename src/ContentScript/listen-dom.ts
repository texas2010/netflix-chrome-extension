import renderPage from './renderPage';

const observerOptions = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true,
};

const targetAppMountPointElement: Element | null =
  document.querySelector('#appMountPoint');

let oldHref = document.location.href;

const mutationObserver = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    if (oldHref !== document.location.href) {
      oldHref = document.location.href;
      console.log(document.location.href);
      renderPage();
    }
  });
});

// eslint-disable-next-line import/no-anonymous-default-export
export default (): void => {
  if (targetAppMountPointElement) {
    mutationObserver.observe(targetAppMountPointElement, observerOptions);
  }
};
