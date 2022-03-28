const urlParse = (urlStr: string) => {
  if (!urlStr) {
    throw new Error('url argument is required');
  }
  const parsedUrl: URL = new URL(urlStr);

  const urlSearchParams = new URLSearchParams(parsedUrl.search);
  const queryObject = Object.fromEntries(urlSearchParams.entries());
  const pathnameArr = parsedUrl.pathname.split('/').filter((item) => item);

  const {
    username,
    origin,
    password,
    pathname,
    port,
    protocol,
    hash,
    host,
    hostname,
    href,
    search,
  } = parsedUrl;

  return {
    username,
    password,
    port,
    originUrl: parsedUrl.toString(),
    href,
    origin,
    protocol,
    host,
    hostname,
    pathname,
    pathnameArr,
    search,
    queryString: search,
    queryObject,
    searchParams: new URLSearchParams(parsedUrl.search),
    hash,
  };
};

export default urlParse;
