// eslint-disable-next-line prettier/prettier
import React, { useEffect } from 'react';
// eslint-disable-next-line prettier/prettier
import { createPortal } from 'react-dom';

interface PortalI {
  // eslint-disable-next-line prettier/prettier
  (props: { selector: string; children: React.ReactNode }): React.ReactPortal;
}

// eslint-disable-next-line prettier/prettier
const Portal: PortalI = ({ selector, children }) => {
  const mount: Element | null = document.querySelector(selector);
  const el = document.createElement('div');

  useEffect(() => {
    if (mount) {
      mount.appendChild(el);
    } else {
      throw new Error('selector is not exist!');
    }
    return (): void => {
      if (mount) {
        mount.removeChild(el);
      }
    };
  }, [el, mount]);

  return createPortal(children, el);
};

export default Portal;
