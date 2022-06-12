import React, { useLayoutEffect } from 'react';
import useIsElementExist from '@content-scripts/hooks/useIsElementExist';
import Portal from '@content-scripts/components/Portal';

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
  const isElementExist = useIsElementExist(selector);

  useLayoutEffect(() => {
    const selectorEl = isElementExist
      ? document.querySelector(selector)
      : false;

    if (isElementExist) {
      const rootEl = document.createElement('div');
      rootEl.setAttribute('id', rootId);

      if (selectorEl) {
        selectorEl.appendChild(rootEl);
      }

      return () => {
        rootEl.remove();
      };
    }
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
