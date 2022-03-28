import { screen, waitFor } from '@testing-library/react';
import isElementExist from '.';

describe('isElementExist async function', () => {
  beforeAll(() => {
    chrome.storage.local.set({ userSettings: { devLog: false } });
  });

  test('should get #fakeAppRoot right now', async () => {
    document.body.innerHTML = `<div data-testid='bodyElement'>
      <div data-testid="fakeAppRoot"></div>
    </div>`;

    await expect(isElementExist("[data-testid='fakeAppRoot']")).resolves.toBe(
      true
    );
  });

  test('should get #mainView later longer', async () => {
    document.body.innerHTML = `<div data-testid='bodyElement'></div>`;

    setTimeout(() => {
      const mainView = document.createElement('div');
      mainView.setAttribute('data-testid', 'mainView');
      screen.getByTestId('bodyElement').appendChild(mainView);
    }, 5);

    await expect(isElementExist("[data-testid='mainView']")).resolves.toBe(
      true
    );
    await waitFor(() => {
      const mainView = screen.queryByTestId('mainView');
      expect(mainView).toBeInTheDocument();
    });
  });

  test(
    'should get false when #fake-root is not exist.',
    async () => {
      document.body.innerHTML = `<div data-testid='bodyElement'></div>`;

      await expect(isElementExist("[data-testid='fake-root']")).resolves.toBe(
        false
      );
      await waitFor(() => {
        const fakeRoot = screen.queryByTestId('fake-root');
        expect(fakeRoot).toBeNull();
      });
    },
    1000 * 6
  );
});
