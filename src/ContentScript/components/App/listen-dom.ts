interface ConnectI {
  // eslint-disable-next-line no-undef
  (setCallback: (arg0: React.SetStateAction<string>) => void): () => void;
}

const connect: ConnectI = (setCallback) => {
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

  const mutationObserver: MutationObserver = new MutationObserver(
    (mutations) => {
      mutations.forEach(() => {
        if (oldHref !== document.location.href) {
          oldHref = document.location.href;
          // console.log(document.location.href);
          setCallback(document.location.href);
        }
      });
    }
  );
  if (targetAppMountPointElement) {
    mutationObserver.observe(targetAppMountPointElement, observerOptions);
  }
  return (): void => {
    mutationObserver.disconnect();
  };
};

export default connect;
