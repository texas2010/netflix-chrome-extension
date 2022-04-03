import { render, screen } from '@testing-library/react';
import Portal from '.';

describe('Portal component', () => {
  beforeEach(() => {
    document.body.innerHTML = `<divBody data-testid='bodyElement'>
      <divApp data-testid="fakeAppRoot">asdfasdf</divApp> // close app
      <divExistRoot data-testid="fakeRootId"></divExistRoot> // close portal
    </divBody>// close divBody`;
  });

  test('should have not Portal in the dom when rootId prop is empty', () => {
    render(
      <Portal rootId=''>
        <span>asdf</span>
      </Portal>
    );

    expect(screen.queryByTestId('fakeRootId')).toBeEmptyDOMElement();
    expect(screen.queryByTestId('fakeRootId')).not.toHaveTextContent('asdf');
  });

  test('should have Portal in the dom and rootId is exist', () => {
    render(
      <Portal rootId="[data-testid='fakeRootId']">
        <span>asdf</span>
      </Portal>
    );

    expect(screen.getByTestId('fakeRootId')).toBeInTheDocument();
    expect(screen.queryByTestId('fakeRootId')).toHaveTextContent('asdf');
  });

  test('should unmount when Portal in the dom got removed', () => {
    const { unmount } = render(
      <Portal rootId="[data-testid='fakeRootId']">
        <span>asdf</span>
      </Portal>
    );
    unmount();
    expect(screen.getByTestId('fakeRootId')).toBeEmptyDOMElement();
  });

  test('should have different props when it rerender', () => {
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
    // screen.debug();
    expect(screen.getByTestId('fakeRootId')).toBeInTheDocument();
    expect(screen.queryByTestId('fakeRootId')).toHaveTextContent(
      'second render'
    );
  });
});
