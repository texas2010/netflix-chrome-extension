import { useLayoutEffect } from 'react';

import { Portal } from '@content-scripts/components';
import { useIsElementExist } from '@content-scripts/hooks';

interface CreateRootElementPortalI {
  (props: {
    rootId: string;
    children: React.ReactNode;
    selector: string;
  }): null | JSX.Element;
}

export const CreateRootElementPortal: CreateRootElementPortalI = ({
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
      <Portal rootId={`#${rootId}`}>{children}</Portal>
    </>
  );
};
