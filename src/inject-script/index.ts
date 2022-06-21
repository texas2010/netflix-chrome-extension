interface netflixInterface {
  reactContext: {
    models: {
      userInfo: unknown;
      profileGateState: unknown;
    };
  };
}

declare global {
  interface Window {
    netflix: netflixInterface;
  }
}

console.log('injected script file');

// window.postMessage({ type: 'FIRST_POST', text: 'Hello from the site' }, '*'); // example

window.postMessage(
  {
    type: 'NETFLIX_USER_INFO_DATA',
    result: window.netflix.reactContext.models.userInfo,
  },
  '*'
);

window.addEventListener('message', (event) => {
  if (event.source !== window) {
    return;
  }

  if (event.data && event.data.type) {
    // console.log('inject script received:', event.data);
    switch (event.data.type) {
      case 'GET_NETFLIX_USER_INFO_DATA':
        window.postMessage(
          {
            type: 'NETFLIX_USER_INFO_DATA',
            result: window.netflix.reactContext.models.userInfo,
          },
          '*'
        );
        break;
      case 'GET_NETFLIX_PROFILE_GATE_STATE_DATA':
        window.postMessage(
          {
            type: 'NETFLIX_PROFILE_GATE_STATE_DATA',
            result: window.netflix.reactContext.models.profileGateState,
          },
          '*'
        );
        break;
      default:
        break;
    }
  }
});

export {};
