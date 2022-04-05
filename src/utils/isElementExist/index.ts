import devLog from '@utils/devLog';

export const observerOptions = {
  childList: true,
  subtree: true,
};

export const findElement = (selector: string) => {
  return new Promise((resolve, reject) => {
    const elementExist = document.querySelector(selector);
    if (elementExist) {
      devLog('findElement: exist!', selector);
      resolve(elementExist);
      return;
    }

    const mutationCallback: MutationCallback = (mutationsList, observer) => {
      for (const mutation of mutationsList) {
        switch (mutation.type) {
          case 'childList':
            if (document.querySelector(selector)) {
              observer.disconnect();
              devLog('findElement: found!', selector);
              resolve(document.querySelector(selector));
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
      reject();
      devLog('findElement: not exist!', selector);
    }, 1000 * 5);
  });
};

const isElementExist = async (selector: string) => {
  try {
    const data = await findElement(selector);
    if (data) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export default isElementExist;
