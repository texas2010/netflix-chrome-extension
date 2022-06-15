import { screen } from '@testing-library/react';

import { hrefChangeEventListen } from './hrefChangeEventListen.service';

describe('hrefChangeEventListen function', () => {
  beforeAll(() => {
    chrome.storage.local.set({ userSettings: { devLog: false } });
  });

  beforeEach(() => {
    window.location.replace('https://www.fake-website.com/');
    document.body.innerHTML = `<div data-testid='bodyElement'></div>`;
  });

  test('should not have new href when the page did not change', (done) => {
    const firstPage = 'https://www.fake-website.com/';

    const disconnect = hrefChangeEventListen((url) => {
      console.log('url', url);
      expect(url).toBe(firstPage);
    });

    setTimeout(() => {
      const divEl1 = document.createElement('div');
      divEl1.setAttribute('data-testid', 'divEl1');
      screen.getByTestId('bodyElement').appendChild(divEl1);
    }, 1);

    setTimeout(() => {
      const divEl2 = document.createElement('div');
      divEl2.setAttribute('data-testid', 'divEl2');
      screen.getByTestId('bodyElement').appendChild(divEl2);
    }, 3);

    setTimeout(() => {
      disconnect();
      done();
    }, 5);
  });

  test('should get new href when the page change', (done) => {
    const firstPage = 'https://www.fake-website.com/';
    const nextPage = 'https://www.fake-website.com/new-page';

    const disconnect = hrefChangeEventListen((url) => {
      expect(url).toBe(nextPage);
      expect(url).not.toBe(firstPage);
    });

    setTimeout(() => {
      const divEl1 = document.createElement('div');
      divEl1.setAttribute('data-testid', 'divEl1');
      screen.getByTestId('bodyElement').appendChild(divEl1);
    }, 1);

    setTimeout(() => {
      window.location.replace('https://www.fake-website.com/new-page');
    }, 2);

    setTimeout(() => {
      const divEl2 = document.createElement('div');
      divEl2.setAttribute('data-testid', 'divEl2');
      screen.getByTestId('bodyElement').appendChild(divEl2);
    }, 3);

    setTimeout(() => {
      disconnect();
      done();
    }, 5);
  });
});
