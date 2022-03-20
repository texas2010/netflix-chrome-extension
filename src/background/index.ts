import devLog from '../utils/devLog';

chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.local.set({
    userSettings: {
      devLog: false,
    },
  });
});

devLog('Background file');
