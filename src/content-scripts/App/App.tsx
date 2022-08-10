import { useWindowLocation } from '@content-scripts/hooks';
import { MyList } from '@content-scripts/views';

import './style.css';

export const App = () => {
  const locationObj = useWindowLocation();

  console.log(locationObj);

  const devCode = (
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

  return (
    <div id='nMainApp'>
      {devCode}

      {
        /* MyList page */
        locationObj.pathname === '/browse/my-list' &&
          !locationObj.queryString && <MyList />
      }
    </div>
  );
};
