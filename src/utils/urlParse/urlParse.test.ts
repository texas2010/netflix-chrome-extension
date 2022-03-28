import urlParse from '.';

describe('urlParse', () => {
  test('should throw error when argument is empty', () => {
    expect(urlParse).toThrowError('url argument is required');
  });

  test('First: should have return from urlParse', () => {
    const input =
      'https://www.netflix.com/browse/my-list?jbv=70155589&asdf=4444&qwer=test';
    const result = urlParse(input);
  });
  //   test('Second: should have return from urlParse', () => {
  //     const input = 'https://www.netflix.com/title/70143825';
  //     const result = urlParse(input);
  //   });
});
