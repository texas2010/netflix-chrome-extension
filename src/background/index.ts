console.log('Background file');

chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.local.set({
    userSettings: {
      devLog: false,
    },
  });
});

export {};
