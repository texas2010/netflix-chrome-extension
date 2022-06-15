import { devLog } from '@services';

export const observerOptions = {
  childList: true,
  subtree: true,
};

const findElement = (selector: string) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(selector)) {
      devLog('findElement: exist!', selector);
      resolve(true);
      return;
    }

    const mutationCallback: MutationCallback = (mutationsList, observer) => {
      for (const mutation of mutationsList) {
        switch (mutation.type) {
          case 'childList':
            if (document.querySelector(selector)) {
              observer.disconnect();
              devLog('findElement: found!', selector);
              resolve(true);
              clearTimeout(timeoutID);
            }
            break;
        }
      }
    };
    const mutationObserver: MutationObserver = new MutationObserver(
      mutationCallback
    );

    mutationObserver.observe(document.body, observerOptions);

    const timeoutID = setTimeout(() => {
      mutationObserver.disconnect();
      resolve(false);
      devLog('findElement: not exist!', selector);
    }, 1000 * 5);
  });
};

export const isElementExist = async (selector: string) => {
  if (!selector) {
    return false;
  }
  try {
    const data = await findElement(selector);

    return data ? true : false;
  } catch (error) {
    console.error(
      'isElementExist function: ',
      'something wrong with it -',
      error
    );
    return false;
  }
};
