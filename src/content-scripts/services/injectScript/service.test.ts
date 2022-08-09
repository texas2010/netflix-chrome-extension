import { injectScript } from '.';

describe('inject script function', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should throw error when argument is empty', () => {
    const expected = 'file path is required';
    expect(injectScript).toThrowError(expected);
  });

  test('should have script element exist in the body.', () => {
    injectScript('static');

    expect(document.body.childNodes).toHaveLength(1);
    expect(document.body.innerHTML.includes('script')).toBe(true);
    expect(document.body.childNodes[0].nodeName.toLowerCase()).toBe('script');
  });

  test('should have type attribute in the script', () => {
    injectScript('static');

    const element = document.body.childNodes[0] as Element;

    expect(element.getAttribute('type')).toBe('text/javascript');
  });

  test('should have src attribute in the script', () => {
    injectScript('static');

    const element = document.body.childNodes[0] as Element;

    expect(element.getAttribute('src')).toBe(
      'chrome-extension://EXTENSION_DIR/static'
    );
  });
  test(`should have same file path in the argument and script's src attribute`, () => {
    injectScript('static/javascript/main.js');

    const element = document.body.childNodes[0] as Element;

    expect(element.getAttribute('src')).toContain('static/javascript/main.js');
  });
});
