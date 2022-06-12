import devLog from '@services/devLog';

devLog('Background file');

chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.local.set({
    userSettings: {
      devLog: false,
    },
  });
});
