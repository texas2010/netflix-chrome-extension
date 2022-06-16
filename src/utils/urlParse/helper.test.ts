import { urlParse } from '.';

describe('urlParse function', () => {
  test('should throw error when argument is empty', () => {
    expect(urlParse).toThrowError('url argument is required');
  });

  test('should throw error when url is invalid', () => {
    const input = 'https ://www.netflix.com/browse/my-list';
    const expected = /Invalid URL/;

    function testResult() {
      urlParse(input);
    }

    expect(testResult).toThrowError(expected);
  });

  test('should have return from urlParse', () => {
    const input =
      'https://www.netflix.com/browse/my-list?jbv=70155589&asdf=4444&qwer=test';

    const result = urlParse(input);

    expect(result).toBeDefined();
  });

  test('should have object return', () => {
    const input = 'https://www.netflix.com/title/70143825';
    const expected = {
      hash: '',
      host: 'www.netflix.com',
      hostname: 'www.netflix.com',
      href: 'https://www.netflix.com/title/70143825',
      origin: 'https://www.netflix.com',
      originUrl: 'https://www.netflix.com/title/70143825',
      password: '',
      pathname: '/title/70143825',
      pathnameArr: ['title', '70143825'],
      port: '',
      protocol: 'https:',
      queryObject: {},
      queryString: '',
      search: '',
      searchParams: new URLSearchParams(new URL(input).search),
      username: '',
    };

    const result = urlParse(input);

    expect(result).toStrictEqual(expected);
  });

  test('should have query string and object', () => {
    const input =
      'https://www.netflix.com/browse/my-list?jbv=70155589&asdf=4444&qwer=test';
    const expected = {
      queryString: '?jbv=70155589&asdf=4444&qwer=test',
      queryObject: { qwer: 'test', jbv: '70155589', asdf: '4444' },
    };

    const result = urlParse(input);

    expect(result).toMatchObject(expected);
  });

  test('should have 3 elements in the pathname array', () => {
    const input = 'https://www.netflix.com/browse/genre/34399?jbv=81453003';

    const expected = {
      pathname: '/browse/genre/34399',
      pathnameArr: ['browse', 'genre', '34399'],
    };

    const result = urlParse(input);

    expect(result).toMatchObject(expected);
  });

  test('should have hash', () => {
    const input =
      'https://www.netflix.com/browse/genre/34399?jbv=81453003#testHash';

    const expected = {
      hash: '#testHash',
    };

    const result = urlParse(input);

    expect(result).toMatchObject(expected);
  });

  test('should get item from searchParams', () => {
    const input =
      'https://www.netflix.com/browse/my-list?jbv=70155589&asdf=4444&qwer=test';
    const expected = '70155589';

    const result = urlParse(input);

    expect(result.searchParams.has('jbv')).toBe(true);
    expect(result.searchParams.get('jbv')).toBe(expected);
  });
});
