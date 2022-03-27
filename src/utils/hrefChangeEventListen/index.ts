import devLog from '../devLog';

type setNewUrlT = (url: React.SetStateAction<string>) => void;

const observerOptions = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true,
};

export const hrefChangeEventListen = (setNewURL: setNewUrlT) => {
  let oldHref = window.location.href;

  const mutationCallback: MutationCallback = (mutationsList) => {
    mutationsList.forEach(() => {
      if (oldHref !== window.location.href) {
        oldHref = window.location.href;
        devLog('new href:', window.location.href);
        setNewURL(window.location.href);
      }
    });
  };

  const mutationObserver: MutationObserver = new MutationObserver(
    mutationCallback
  );

  mutationObserver.observe(document.body, observerOptions);

  return () => {
    mutationObserver.disconnect();
  };
};
