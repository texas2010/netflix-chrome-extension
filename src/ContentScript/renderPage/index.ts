import myListPage from './myListPage';

const index = (): void => {
  console.log('render page');
  console.log('page', document.location.pathname, document.location.href);
  if (document.location.pathname.includes('/my-list')) {
    console.log('my-list', document.location.pathname);
    myListPage();
  } else if (document.location.pathname.includes('/title')) {
    // need to get title id from string. regex?
    console.log('title', document.location.pathname);
  } else if (
    document.location.pathname.includes('/browse') &&
    document.location.search !== ''
  ) {
    console.log(
      '/browse',
      document.location.pathname,
      document.location.search
    );
  }
};

export default index;
