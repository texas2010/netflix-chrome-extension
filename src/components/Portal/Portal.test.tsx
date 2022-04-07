import { render, screen } from '@testing-library/react';
import Portal from '.';

describe('Portal component', () => {
  beforeAll(() => {
    chrome.storage.local.set({ userSettings: { devLog: false } });
  });

  beforeEach(() => {
    document.body.innerHTML = `<divBody data-testid='bodyElement'>
      <divApp data-testid="fakeAppRoot">asdfasdf</divApp> // close app
      <divExistRoot data-testid="fakeRootId"></divExistRoot> // close portal
    </divBody>// close divBody`;
  });

  test('Should not have render portal when rootid is empty in the string.', () => {
    render(
      <Portal rootId=''>
        <span>rootId is empty in the string</span>
      </Portal>
    );

    expect(screen.queryByTestId('fakeRootId')).toBeEmptyDOMElement();

    expect(screen.queryByTestId('fakeRootId')).not.toHaveTextContent(
      'rootId is empty in the string'
    );
  });

  test('should not have render Portal when children is empty', () => {
    render(<Portal rootId="[data-testid='fakeRootId']">{undefined}</Portal>);

    expect(screen.getByTestId('fakeRootId')).toBeInTheDocument();
    expect(screen.getByTestId('fakeRootId')).toHaveTextContent('');

    screen.getByTestId('fakeRootId').childNodes.forEach((element) => {
      expect(element).toBeEmptyDOMElement();
    });
  });

  test('should have render Portal when rootId is exist', (done) => {
    render(
      <Portal rootId="[data-testid='fakeRootId']">
        <span>Portal is rendered</span>
      </Portal>
    );

    setTimeout(() => {
      expect(screen.getByTestId('fakeRootId')).toBeInTheDocument();
      expect(screen.queryByTestId('fakeRootId')).toHaveTextContent(
        'Portal is rendered'
      );
      done();
    }, 1);
  });

  test('should not have render it when rootId is not exist', (done) => {
    render(
      <Portal rootId="[data-testid='notExistRootid']">
        <span>when rootId is not exist</span>
      </Portal>
    );

    setTimeout(() => {
      expect(screen.queryByTestId('notExistRootid')).not.toBeInTheDocument();
      done();
    }, 5005);
  }, 6000);

  test('should unmount when Portal in the dom got removed', () => {
    const { unmount } = render(
      <Portal rootId="[data-testid='fakeRootId']">
        <span>asdf</span>
      </Portal>
    );

    expect(screen.getByTestId('fakeRootId')).toBeInTheDocument();

    unmount();

    expect(screen.getByTestId('fakeRootId')).toBeEmptyDOMElement();
  });

  test('should have different props when it render again', (done) => {
    const { rerender } = render(
      <Portal rootId="[data-testid='fakeRootId']">
        <span>first render</span>
      </Portal>
    );

    rerender(
      <Portal rootId="[data-testid='fakeRootId']">
        <span>second render</span>
      </Portal>
    );

    setTimeout(() => {
      expect(screen.getByTestId('fakeRootId')).toBeInTheDocument();
      expect(screen.queryByTestId('fakeRootId')).toHaveTextContent(
        'second render'
      );
      done();
    }, 1);
  });
});
