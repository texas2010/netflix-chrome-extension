/*
Do not use devLog function in this file. or this script will be broke and throw error.
*/

if (process.env.NODE_ENV === 'development') {
  console.log('Background file');

  console.log(new Date());
}

chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.local.set({
    userSettings: {
      devLog: false,
    },
  });

  chrome.storage.sync.set({
    userSettings: {
      showTitleInMyList: false,
      sortByDropdown: 'DEFAULT',
    },
  });
});

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((message) => {
    console.log('background script received: ', message);
    switch (message.type) {
      default:
        break;
    }
  });
});

export {};
