/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import CreateRootElementPortal from '.';

describe('CreateRootElementPortal Component', () => {
  beforeAll(() => {
    chrome.storage.local.set({ userSettings: { devLog: false } });
  });

  beforeEach(() => {
    document.body.innerHTML = `<divBody data-testid='bodyElement'>
      <divApp data-testid="fakeAppRoot">asdfasdf</divApp> // close appRoot
      <divExistRoot data-testid="fakeRootId"></divExistRoot> // close existRoot
    </divBody>// close divBody`;
  });

  test('should not render it when rootId prop is not exist', () => {
    render(
      <CreateRootElementPortal
        rootId={''}
        selector={"[data-testid='fakeRootId']"}
      >
        <div>rootId prop is not exist</div>
      </CreateRootElementPortal>
    );

    expect(screen.queryByTestId('fakeRootId')).toBeEmptyDOMElement();
    expect(screen.queryByTestId('fakeRootId')).not.toHaveTextContent(
      'rootId prop is not exist'
    );
  });

  test('should not render it when children prop is not exist', () => {
    render(
      <CreateRootElementPortal
        rootId={'childrenPropNotExist'}
        selector={"[data-testid='fakeRootId']"}
      >
        {undefined}
      </CreateRootElementPortal>
    );

    expect(screen.queryByTestId('fakeRootId')).toBeEmptyDOMElement();
  });

  test('should not have render it when selector is empty in the string', (done) => {
    render(
      <CreateRootElementPortal rootId={'selectorPropNotExist'} selector={''}>
        <div>selector prop is not exist</div>
      </CreateRootElementPortal>
    );

    setTimeout(() => {
      const rootEl = document.querySelector('#selectorPropNotExist');

      expect(rootEl).toBeNull();
      expect(screen.queryByTestId('fakeRootId')).toBeEmptyDOMElement();
      expect(screen.queryByTestId('fakeRootId')).not.toHaveTextContent(
        'selector prop is not exist'
      );
      done();
    }, 1);
  });

  test('should render it when selector is exist in the dom.', (done) => {
    render(
      <CreateRootElementPortal
        rootId={'CreateNewRootElement'}
        selector={"[data-testid='fakeRootId']"}
      >
        <h1>this message must be exist now.</h1>
      </CreateRootElementPortal>
    );

    setTimeout(() => {
      const rootEl = document.querySelector('#CreateNewRootElement');

      expect(rootEl?.id).toBe('CreateNewRootElement');
      expect(screen.getByTestId('fakeRootId')).toHaveTextContent(
        'this message must be exist now.'
      );
      done();
    }, 1);
  });

  test('should not have render it when selector is not exist in the dom', (done) => {
    render(
      <CreateRootElementPortal
        rootId={'CreateNewRootElement'}
        selector={"[data-testid='notExistElement']"}
      >
        <h1>selector is not exist in the dom.</h1>
      </CreateRootElementPortal>
    );

    setTimeout(() => {
      const rootEl = document.querySelector('#CreateNewRootElement');

      expect(rootEl).toBeNull();
      expect(screen.queryByTestId('notExistElement')).not.toBeInTheDocument();
      done();
    }, 5005);
  }, 6000);
});
