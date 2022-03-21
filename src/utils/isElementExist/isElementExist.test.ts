import { screen, waitFor } from '@testing-library/react';
import isElementExist, { observerOptions } from '.';

describe('isElementExist async function', () => {
  beforeAll(() => {
    chrome.storage.local.set({ userSettings: { devLog: false } });
  });
  beforeEach(() => {
    document.body.innerHTML = `<div data-testid='body-element'>
        <div data-testid="fakeAppRoot"></div>
    </div>`;
  });

  test('should get #main-view later', async () => {
    setTimeout(() => {
      const mainView = document.createElement('div');
      mainView.setAttribute('data-testid', 'main-view');
      screen.getByTestId('fakeAppRoot').appendChild(mainView);
    }, 1);

    await waitFor(() => {
      // eslint-disable-next-line jest/valid-expect
      expect(isElementExist("[data-testid='main-view']")).resolves.toBe(true);
    });
  });

  test('should get #fakeAppRoot right now', async () => {
    await waitFor(() => {
      // eslint-disable-next-line jest/valid-expect
      expect(isElementExist("[data-testid='fakeAppRoot']")).resolves.toBe(true);
    });
  });
});
