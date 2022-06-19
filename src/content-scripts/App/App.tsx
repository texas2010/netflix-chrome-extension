import { useWindowLocation } from '@content-scripts/hooks';

import './style.css';

export const App = () => {
  const locationObj = useWindowLocation();

  return (
    <>
      {process.env.NODE_ENV === 'development' && (
        <>
          <h1 style={{ textAlign: 'center' }}>i am here now!</h1>
          <h2 style={{ textAlign: 'center' }}>
            SitePage: {locationObj.originUrl}
          </h2>
        </>
      )}
    </>
  );
};
