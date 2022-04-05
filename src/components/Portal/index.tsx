import React, { useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import useIsElementExist from '@hooks/useIsElementExist';

interface PortalI {
  (props: { rootId: string; children: React.ReactNode }): JSX.Element | null;
}

const Portal: PortalI = ({ rootId, children }) => {
  const isElementExist = useIsElementExist(rootId || 'nFakeRoot');
  const mountEl: Element | null = document.querySelector(rootId || 'nFakeRoot');
  const divEl = document.createElement('div');

  useLayoutEffect(() => {
    if (mountEl) {
      mountEl.appendChild(divEl);
    }
    return (): void => {
      if (mountEl) {
        mountEl.removeChild(divEl);
      }
    };
  }, [divEl, rootId, mountEl, isElementExist]);

  if (!rootId || !mountEl || !children || !isElementExist) {
    return null;
  }

  return createPortal(children, divEl);
};

export default Portal;
