import afs from 'fs/promises';
import path from 'path';

import getPackageInfo, { error } from './getPackageInfo';

describe('getPackageInfo function', () => {
  test('should have throw error when package.json is not exist', async () => {
    const filename = `${path.resolve('./fake-test')}/fake-package.json`;
    const expected = error.packageRequired;

    await expect(getPackageInfo(filename)).rejects.toThrowError(expected);
  });
  test('should have package.json exist', async () => {
    const filename = `${path.resolve('./fake-test')}/temp-package.json`;
    const input = JSON.stringify({ testMessage: 'ok', version: '1.4.1' });
    const expected = { testMessage: 'ok', version: '1.4.1' };

    await afs.writeFile(filename, input);

    await expect(getPackageInfo(filename)).resolves.toEqual(expected);
    await afs.unlink(filename);
  });
  test('should throw error when package.json is exist but empty', async () => {
    const filename = `${path.resolve('./fake-test')}/temp-package.json`;
    const input = '';
    const expected = error.packageExistEmpty;

    await afs.writeFile(filename, input);

    await expect(getPackageInfo(filename)).rejects.toThrowError(expected);

    await afs.unlink(filename);
  });
  test('should throw error when it is not object in the package.json', async () => {
    const filename = `${path.resolve('./fake-test')}/temp-package.json`;
    const input: any[] = [];
    const expected = error.packageObjectRequired;

    await afs.writeFile(filename, JSON.stringify(input));

    await expect(getPackageInfo(filename)).rejects.toThrowError(expected);

    await afs.unlink(filename);
  });
  test('should throw error when object is empty in the package.json', async () => {
    const filename = `${path.resolve('./fake-test')}/temp-package.json`;
    const input = {};
    const expected = error.packageObjectEmpty;

    await afs.writeFile(filename, JSON.stringify(input));

    await expect(getPackageInfo(filename)).rejects.toThrowError(expected);

    await afs.unlink(filename);
  });
  test('should throw error when package.json do not have version property', async () => {
    const filename = `${path.resolve('./fake-test')}/temp-package.json`;
    const input = {
      name: 'fake project',
      asdf: 'asdf',
      fdsa: 'fdas',
    };
    const expected = error.packageVersionRequired;

    await afs.writeFile(filename, JSON.stringify(input));

    await expect(getPackageInfo(filename)).rejects.toThrowError(expected);

    await afs.unlink(filename);
  });
  test('should have version property in the package.json', async () => {
    const filename = `${path.resolve('./fake-test')}/temp-package.json`;
    const input = {
      name: 'fake project',
      version: '1.4.1',
      asdf: 'asdf',
      fdsa: 'fdas',
    };
    const expected = {
      version: '1.4.1',
    };

    await afs.writeFile(filename, JSON.stringify(input));

    await expect(getPackageInfo(filename)).resolves.toMatchObject(expected);

    await afs.unlink(filename);
  });
});
