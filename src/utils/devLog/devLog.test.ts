import devLog, { error } from '.';

describe('devLog function', () => {
  const originalEnv = process.env;
  afterEach(() => {
    process.env = originalEnv;
  });
  test('should throw error when argument is empty', () => {
    const expected = error.emptyArg;

    expect(devLog).toThrowError(expected);
  });
  // check devlog and inform them, callback is required.

  test('should have console.log when it called', () => {
    jest.spyOn(global.console, 'log').mockImplementation();

    const input = 'test';
    const expected = 'test';

    devLog(() => {
      console.log(input);
    });
    expect(console.log).toHaveBeenCalled();
    expect(console.log).toBeCalledWith(expected);
  });

  // check dev env. if dev end enable then call log.
  test('should have console.log when it called during development env', () => {
    process.env = {
      ...originalEnv,
      NODE_ENV: 'development',
    };

    jest.spyOn(global.console, 'log').mockImplementation();

    const input = 'dev test';
    const expected = 'dev test';

    devLog(() => {
      console.log(input);
    });
    expect(console.log).toHaveBeenCalled();
    expect(console.log).toBeCalledWith(expected);
  });

  // check prod env. no console log!
  test('should not have console.log during production env', () => {
    process.env = {
      ...originalEnv,
      NODE_ENV: 'production',
    };
    jest.spyOn(global.console, 'log').mockImplementation();

    const input = 'prod test';
    const expected = 'prod test';

    devLog(() => {
      console.log(input);
    });
    expect(console.log).not.toHaveBeenCalled();
    expect(console.log).not.toBeCalledWith(expected);
  });

  // check prod env. enable user settting. must have console log.
  test('should have console.log when user setting is enable for show log during production env', () => {
    process.env = {
      ...originalEnv,
      NODE_ENV: 'production',
    };
    jest.spyOn(global.console, 'log').mockImplementation();

    const input = 'prod test';
    const expected = 'prod test';

    devLog(() => {
      console.log(input);
    });
    expect(console.log).toHaveBeenCalled();
    expect(console.log).toBeCalledWith(expected);
  });
});
