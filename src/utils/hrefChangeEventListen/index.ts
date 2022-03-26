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
  let oldHref = document.location.href;
  const mutationCallback: MutationCallback = (mutationsList, observer) => {
    mutationsList.forEach(() => {
      if (oldHref !== document.location.href) {
        oldHref = document.location.href;
        console.log('new href:', document.location.href);
        setNewURL(document.location.href);
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
