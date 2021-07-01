import React from 'react';

import MyListPage from '../MyListPage';

interface RoutePageI {
  (props: {
    pathname: string;
    search: string | null;
    searchParams: URLSearchParams;
    // eslint-disable-next-line no-undef
  }): JSX.Element;
}

// eslint-disable-next-line prettier/prettier
const RoutePage: RoutePageI = ({ pathname, search, searchParams }) => {
  return (
    <>
      {pathname === '/browse' && search === '' && 'Browse Page'}
      {pathname.includes('/browse') &&
        search !== '' &&
        searchParams.has('jbv') &&
        `Browse/Title Page ${searchParams.get('jbv')}`}
      {pathname.includes('/my-list') && <MyListPage />}
      {pathname.includes('/title') &&
        `Title Page: ${pathname.split('/').reverse()[0]}`}
    </>
  );
};

export default RoutePage;
