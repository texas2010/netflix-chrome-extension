/*
    Parameter: activeName

    getEventListeners()
*/

import { isElementExist } from '@content-scripts/services';

interface WhoIsWatchingViewActions {
  (activeProfileName: string): void;
}

export const whoIsWatchingViewActions: WhoIsWatchingViewActions = (
  activeProfileName
) => {
  console.log('activeProfileName', activeProfileName);

  // install profile click event listener
  const profileLinkElArr = document.querySelectorAll(
    '.choose-profile .profile-link'
  );

  if (profileLinkElArr.length < 1) {
    return;
  }

  for (let i = 0; i < profileLinkElArr.length; i++) {
    const element = profileLinkElArr[i];

    element.addEventListener('click', (event) => {
      if (event.currentTarget) {
        const profileLinkEl = event.currentTarget as Element;

        const profileNameEl = profileLinkEl.querySelector('.profile-name');
        if (!profileNameEl || !profileNameEl.textContent) {
          return;
        }

        const chosenName = profileNameEl.textContent;
        if (activeProfileName === chosenName) {
          (async () => {
            if (await isElementExist('#main-view')) {
              console.log('start to install react view');
            }
          })();
        }
      }
    });
  }

  // install DOM listener
};
