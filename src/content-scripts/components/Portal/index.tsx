import React, { useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { useIsElementExist } from '@content-scripts/hooks';

interface PortalI {
  (props: { rootId: string; children: React.ReactNode }): JSX.Element | null;
}

const Portal: PortalI = ({ rootId, children }) => {
  const divEl = document.createElement('div');

  const isElementExist = useIsElementExist(rootId);

  useLayoutEffect(() => {
    const mountEl = isElementExist ? document.querySelector(rootId) : false;

    if (mountEl) {
      mountEl.appendChild(divEl);
    }

    return (): void => {
      if (mountEl) {
        mountEl.removeChild(divEl);
      }
    };
  }, [rootId, isElementExist, divEl]);

  if (!rootId || !children || !isElementExist) {
    return null;
  }

  return createPortal(children, divEl);
};

export default Portal;
