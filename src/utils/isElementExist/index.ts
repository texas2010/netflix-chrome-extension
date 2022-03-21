import devLog from '../devLog';

export const observerOptions = {
  childList: true,
  subtree: true,
};

export const findElement = (selector: string) => {
  return new Promise((resolve) => {
    const elementExist = document.querySelector(selector);
    if (elementExist) {
      devLog('findElement: it is exist.', selector);
      resolve(elementExist);
      return;
    }

    const mutationCallback: MutationCallback = (mutationsList, observer) => {
      for (const mutation of mutationsList) {
        switch (mutation.type) {
          case 'childList':
            if (document.querySelector(selector)) {
              devLog('findElement: found!', selector);
              resolve(document.querySelector(selector));
              observer.disconnect();
            }
            break;
        }
      }
    };
    const mutationObserver: MutationObserver = new MutationObserver(
      mutationCallback
    );

    mutationObserver.observe(document.body, observerOptions);
  });
};

const isElementExist = async (selector: string) => {
  const data = await findElement(selector);
  if (data) {
    return true;
  }
  return false;
};

export default isElementExist;
