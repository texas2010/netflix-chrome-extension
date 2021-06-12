import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Portal: ({
  id,
  children,
}: {
  id: string;
  children: JSX.Element;
  // eslint-disable-next-line prettier/prettier
}) => React.ReactPortal = ({ id, children }) => {
  const mount: Element | null = document.getElementById(id);
  const el = document.createElement('div');

  useEffect(() => {
    if (mount) {
      mount.appendChild(el);
    } else {
      throw new Error('element id is not exist!');
    }
    return () => {
      if (mount) {
        mount.removeChild(el);
      }
    };
  }, [el, mount]);

  return createPortal(children, el);
};

export default Portal;
