import React, { useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

interface PortalI {
  (props: { rootId: string; children: React.ReactNode }): JSX.Element | null;
}

const Portal: PortalI = ({ rootId, children }) => {
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
  }, [divEl, mountEl]);

  if (!mountEl || !children) {
    return null;
  }

  return createPortal(children, divEl);
};

export default Portal;
