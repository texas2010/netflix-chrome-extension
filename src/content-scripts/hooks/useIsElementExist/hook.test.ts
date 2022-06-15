import { screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useIsElementExist } from '.';

describe('useIsElementExist', () => {
  beforeAll(() => {
    chrome.storage.local.set({ userSettings: { devLog: false } });
  });

  beforeEach(() => {
    document.body.innerHTML = `<div data-testid='bodyElement'>
    <div data-testid="fakeAppRoot"></div>
  </div>`;
  });

  test('should get true when #appRootFirst is exist', (done) => {
    document.body.innerHTML = `<div data-testid='bodyElement'>
      <div data-testid="appRootFirst"></div>
    </div>`;

    const { result } = renderHook(() => {
      return useIsElementExist("[data-testid='appRootFirst']");
    });
    expect(result.current).toBe(false);

    setTimeout(() => {
      expect(result.current).toBe(true);
      done();
    }, 1);
  });

  test('should get true when #appRootSecond found!', (done) => {
    const { result } = renderHook(() => {
      return useIsElementExist("[data-testid='appRootSecond']");
    });
    expect(result.current).toBe(false);
    expect(screen.queryByTestId('appRootSecond')).toBeNull();

    setTimeout(() => {
      const divEl1 = document.createElement('div');
      divEl1.setAttribute('data-testid', 'divEl1');
      screen.getByTestId('bodyElement').appendChild(divEl1);
    }, 1);

    setTimeout(() => {
      const divEl2 = document.createElement('div');
      divEl2.setAttribute('data-testid', 'appRootSecond');
      screen.getByTestId('bodyElement').appendChild(divEl2);
    }, 2);

    setTimeout(() => {
      expect(result.current).toBe(true);
      expect(screen.getByTestId('appRootSecond')).toBeInTheDocument();
      done();
    }, 3);
  });

  test('should get false when #appRootThird is not exist', (done) => {
    const { result } = renderHook(() => {
      return useIsElementExist("[data-testid='appRootThird']");
    });
    expect(result.current).toBe(false);

    setTimeout(() => {
      const divEl1 = document.createElement('div');
      divEl1.setAttribute('data-testid', 'divEl1');
      screen.getByTestId('bodyElement').appendChild(divEl1);
    }, 1);

    setTimeout(() => {
      expect(result.current).toBe(false);
      done();
    }, 5000);
  }, 6000);

  test('should get false when empty string in the argument', (done) => {
    const { result } = renderHook(() => {
      return useIsElementExist('');
    });

    expect(result.current).toBe(false);

    setTimeout(() => {
      expect(result.current).toBe(false);
      done();
    }, 3);
  });
});
