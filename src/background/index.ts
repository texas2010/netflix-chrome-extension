import devLog from '../utils/devLog';

devLog('Background file');

chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.local.set({
    userSettings: {
      devLog: false,
    },
  });
});
