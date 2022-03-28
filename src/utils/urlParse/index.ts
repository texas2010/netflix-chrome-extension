const urlParse = (urlStr: string) => {
  if (!urlStr) {
    throw new Error('url argument is required');
  }
  try {
    const parsedUrl = new URL(urlStr);

    const urlSearchParamsObj = new URLSearchParams(parsedUrl.search);
    const queryObject = Object.fromEntries(urlSearchParamsObj.entries());
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
      searchParams: urlSearchParamsObj,
      hash,
    };
  } catch (error: any) {
    if (error.name === 'TypeError') {
      if (error.message.includes('Invalid URL')) {
        throw error.message;
      }
    }
    throw error;
  }
};

export default urlParse;
