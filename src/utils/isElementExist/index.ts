/*
need to check element is exist. if it is exist. return true.
if it is not exist. need to monitor them until it is exist or end of monitor 


*/

import { callbackify } from 'util';

export const connect = (element: string) => {
  return new Promise((resolve, reject) => {
    const observerOptions = {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
      attributeOldValue: true,
      characterDataOldValue: true,
    };
    const targetAppMountPointElement: Element | null =
      document.querySelector('body');

    const mutationObserver: MutationObserver = new MutationObserver(
      (mutationsList, observer) => {
        for (const mutation of mutationsList) {
          // console.log(mutation);
          switch (mutation.type) {
            case 'childList':
              console.log(
                `${element}: `,
                mutation.target,
                mutation.target.isSameNode(document.querySelector(element))
              );
              if (mutation.target.isSameNode(document.querySelector(element))) {
                // TRUE!
                // need to return this line.
                resolve('it is exist!');
                observer.disconnect();
                console.log(element, 'stop and disconnect it!');
              }
              break;
          }
        }
      }
    );
    if (targetAppMountPointElement) {
      mutationObserver.observe(targetAppMountPointElement, observerOptions);
    }
  });
};

const isElementExist = async (element: string) => {
  const data = await connect(element);
  console.log(data);

  if (document.querySelector(element)) {
    return true;
  }
  return data;
};

export default isElementExist;
