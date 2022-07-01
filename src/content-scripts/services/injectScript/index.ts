interface injectScriptInterface {
  (filePath: string): void;
}

export const injectScript: injectScriptInterface = (filePath) => {
  if (!filePath) {
    throw new Error('file path is required');
  }

  const url = chrome.runtime.getURL(filePath);
  const bodyEl = document.querySelector('body');
  const scriptEl = document.createElement('script');

  scriptEl.setAttribute('type', 'text/javascript');
  scriptEl.setAttribute('src', url);

  if (bodyEl) {
    bodyEl.appendChild(scriptEl);
  }
};
