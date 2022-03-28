import afs from 'fs/promises';
import path from 'path';

import getPackageInfo, { error } from './getPackageInfo';

describe('getPackageInfo async function', () => {
  const buildPath = process.env.TEST_BUILD_PATH as string;
  const packageFilename = `${path.resolve(buildPath)}/package.json`;

  afterEach(async () => {
    try {
      await afs.unlink(packageFilename);
    } catch (error) {}
  });

  test('should have throw error when package.json is not exist', async () => {
    const expected = error.fileRequired;

    await expect(getPackageInfo()).rejects.toThrowError(expected);
  });
  test('should throw error when package.json is exist but empty', async () => {
    const input = '';
    const expected = error.fileExistEmpty;

    await afs.writeFile(packageFilename, input);

    await expect(getPackageInfo()).rejects.toThrowError(expected);
  });
  test('should throw error when it is not object in the package.json', async () => {
    const input: any[] = [];
    const expected = error.objectRequired;

    await afs.writeFile(packageFilename, JSON.stringify(input));

    await expect(getPackageInfo()).rejects.toThrowError(expected);
  });
  test('should throw error when object is empty in the package.json', async () => {
    const input = {};
    const expected = error.objectEmpty;

    await afs.writeFile(packageFilename, JSON.stringify(input));

    await expect(getPackageInfo()).rejects.toThrowError(expected);
  });
  test('should throw error when package.json do not have version property', async () => {
    const input = {
      name: 'fake project',
      asdf: 'asdf',
      fdsa: 'fdas',
    };
    const expected = error.versionRequired;

    await afs.writeFile(packageFilename, JSON.stringify(input));

    await expect(getPackageInfo()).rejects.toThrowError(expected);
  });
  test('should have package.json exist', async () => {
    const input = { testMessage: 'ok', version: '1.4.1' };
    const expected = { testMessage: 'ok', version: '1.4.1' };

    await afs.writeFile(packageFilename, JSON.stringify(input));

    await expect(getPackageInfo()).resolves.toEqual(expected);
  });
  test('should have version property in the package.json', async () => {
    const input = {
      name: 'fake project',
      version: '1.4.1',
      asdf: 'asdf',
      fdsa: 'fdas',
    };
    const expected = {
      version: '1.4.1',
    };

    await afs.writeFile(packageFilename, JSON.stringify(input));

    await expect(getPackageInfo()).resolves.toMatchObject(expected);
  });
});
