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
