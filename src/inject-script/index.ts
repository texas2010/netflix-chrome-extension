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

console.log(window.netflix.reactContext.models.userInfo.data);

export {};
