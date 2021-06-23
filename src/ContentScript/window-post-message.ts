declare global {
  interface Window {
    netflix: {
      reactContext: {
        models: {
          userInfo: {
            data: unknown;
          };
        };
      };
    };
  }
}

export const userInfoData = async (): Promise<void> => {
  await ((): void => {
    function script(): void {
      const started = Date.now();
      const timerID = setTimeout(function tick() {
        // console.log('tick');
        const isElementExist: Element | null = document.querySelector(
          '#n-app-root .user-info-data-loading'
        );
        if (Date.now() - started > 10000) {
          clearTimeout(timerID);
        } else if (isElementExist) {
          // console.log('putting window post message');
          window.postMessage(
            {
              type: 'USER_INFO_DATA',
              data: window.netflix.reactContext.models.userInfo.data,
            },
            '*'
          );
        } else {
          console.log('tick again');
          setTimeout(tick, 1000);
        }
      }, 1000);
    }

    function send(fn: () => void): void {
      const scriptEl = document.createElement('script');
      scriptEl.text = `(${fn.toString()})();`;
      document.documentElement.appendChild(scriptEl);
    }

    send(script);
  })();
};

export {};
