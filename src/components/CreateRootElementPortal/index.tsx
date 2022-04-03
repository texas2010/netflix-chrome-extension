// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useLayoutEffect } from 'react';
import useIsElementExist from '../../hooks/useIsElementExist';
import Portal from '../Portal';

interface CreateRootElementPortalI {
  (props: {
    rootId: string;
    children: React.ReactNode;
    selector: string;
  }): null | JSX.Element;
}

const CreateRootElementPortal: CreateRootElementPortalI = ({
  rootId,
  children,
  selector,
}) => {
  const isElementExist: Boolean = useIsElementExist(selector || 'nFakeRoot');

  useLayoutEffect(() => {
    const selectorEl: Element | null = document.querySelector(
      selector || 'nFakeRoot'
    );

    const rootEl = document.createElement('div');
    rootEl.setAttribute('id', rootId);

    if (selectorEl && isElementExist) {
      selectorEl.appendChild(rootEl);
    }

    return () => {
      rootEl.remove();
    };
  }, [isElementExist, rootId, selector]);

  if (!selector || !rootId || !children || !isElementExist) {
    return null;
  }

  return (
    <>
      <h1>test</h1>
      <Portal rootId={`#${rootId}`}>{children}</Portal>
    </>
  );
};

export default CreateRootElementPortal;
