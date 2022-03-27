import { screen, waitFor } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import useLocationPage from '.';

describe('useLocationPage', () => {
  beforeAll(() => {
    chrome.storage.local.set({ userSettings: { devLog: false } });
  });

  beforeEach(() => {
    window.location.replace('https://www.fake-website.com/');
    document.body.innerHTML = `<div data-testid='bodyElement'></div>`;
  });

  test('should get default raw url', () => {
    const expected = 'https://www.fake-website.com/';

    const { result } = renderHook(useLocationPage);

    expect(result.current).toBe(expected);
  });

  test('should get new raw url when the page changed.', (done) => {
    const input = 'https://www.fake-website.com/new-page';
    const expected = 'https://www.fake-website.com/new-page';

    const { result } = renderHook(useLocationPage);

    setTimeout(() => {
      const divEl1 = document.createElement('div');
      divEl1.setAttribute('data-testid', 'divEl1');
      screen.getByTestId('bodyElement').appendChild(divEl1);
    }, 1);

    setTimeout(() => {
      window.location.replace(input);
    }, 2);

    setTimeout(() => {
      const divEl2 = document.createElement('div');
      divEl2.setAttribute('data-testid', 'divEl2');
      screen.getByTestId('bodyElement').appendChild(divEl2);
    }, 3);

    setTimeout(() => {
      expect(result.current).toBe(expected);
      done();
    }, 4);
  }, 10);
});
