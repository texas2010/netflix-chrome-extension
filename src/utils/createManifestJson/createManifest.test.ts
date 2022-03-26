import afs from 'fs/promises';
import path from 'path';

import createManifestFile, { error } from './createManifestFile';

describe('createManifestFile async function', () => {
  const originalEnv = process.env;

  const buildPath = process.env.TEST_BUILD_PATH as string;
  const packageFilename = `${path.resolve(buildPath)}/package.json`;
  const manifestConfigFilename = `${path.resolve(
    buildPath
  )}/manifest.config.json`;
  const manifestJsonFilename = `${path.resolve(buildPath)}/manifest.json`;

  // before each to create package file
  beforeEach(async () => {
    const input = {
      name: 'fake project',
      version: '1.4.1',
      asdf: 'asdf',
      fdsa: 'fdas',
    };

    await afs.writeFile(packageFilename, JSON.stringify(input));
  });
  // after each for remove package file
  afterEach(async () => {
    try {
      await afs.unlink(packageFilename);
    } catch (error) {}
  });
  // after each for remove manifest config file
  afterEach(async () => {
    try {
      await afs.unlink(manifestConfigFilename);
    } catch (error) {}
  });
  // after each for process.env changed back to normal
  afterEach(() => {
    process.env = originalEnv;
  });
  test('should throw error when manifest.config.json is not exist', async () => {
    const expected = error.fileRequired;

    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test('should throw error when manifest.config.json is exist but empty', async () => {
    const input = '';
    const expected = error.fileExistEmpty;

    await afs.writeFile(manifestConfigFilename, input);

    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test('should throw error when it is not object in the manifest.config.json', async () => {
    const input: any[] = [];
    const expected = error.objectRequired;

    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));

    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test('should throw error when object is empty in the manifest.config.json', async () => {
    const input = {};
    const expected = error.objectEmpty;

    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));

    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test('should throw error when object do not have correct property', async () => {
    const input = { asdf: '', fdsa: 4, name: 'test' };
    const expected = error.objectWrongProperty;

    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));

    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test('should throw error when name, description, and options_page is not string', async () => {
    const input = {
      name: 5,
      description: [],
      options_page: {},
      manifest_version: 3,
      permissions: [],
      content_scripts: {},
      action: {},
      icons: {},
      background: {},
    };
    const expected = /must be string/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test('should throw error when name, description, and options_page string is empty', async () => {
    const input = {
      name: '',
      description: '',
      options_page: '',
      manifest_version: 3,
      permissions: [],
      content_scripts: [],
      action: {},
      icons: {},
      background: {},
    };
    const expected = /can't be empty/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test('should throw error when manifest_version is not number', async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: {},
      permissions: [],
      content_scripts: {},
      action: {},
      icons: {},
      background: {},
    };
    const expected = /must be number./;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test('should throw error when permissions and content_scripts is not array', async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: {},
      content_scripts: {},
      action: {},
      icons: {},
      background: {},
    };
    const expected = /must be array/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test(`should throw error when content_scripts' array is empty`, async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [],
      action: {},
      icons: {},
      background: {},
    };
    const expected = /array can't be empty/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test(`should throw error when content_scripts' array's element don't have object`, async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: ['', 4],
      action: {},
      icons: {},
      background: {},
    };
    const expected = /array must have object in the each element./;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test(`should throw error when content_scripts' array's each object's properties do not have matches, css and js`, async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [{}],
      action: {},
      icons: {},
      background: {},
    };
    const expected = /each object's properties must be matches, css and js/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test(`should throw error when content_scripts' array's each object's values is not array`, async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [
        {
          matches: '',
          css: [],
          js: [],
        },
      ],
      action: {},
      icons: {},
      background: {},
    };
    const expected = /must be array/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test(`should throw error when content_scripts' array's each object's values' element is empty`, async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [
        {
          matches: [],
          css: [],
          js: [],
        },
      ],
      action: {},
      icons: {},
      background: {},
    };
    const expected = /can't be empty/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test(`should throw error when content_scripts' array's each object's values' element is not string`, async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [
        {
          matches: [4],
          css: [],
          js: [],
        },
      ],
      action: {},
      icons: {},
      background: {},
    };
    const expected = /array's element must be string/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test(`should throw error when content_scripts' array's each object's values' element string can't be empty`, async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [
        {
          matches: ['asdf'],
          css: [''],
          js: [],
        },
      ],
      action: {},
      icons: {},
      background: {},
    };
    const expected = /string can't be empty/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test(`should throw error when permissions's each element is not string in the array`, async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: [{}],
      content_scripts: [
        {
          matches: ['asdf'],
          css: ['asdf'],
          js: ['asdf'],
        },
      ],
      action: {
        default_icon: { 16: 'asdf', 24: 'asdf', 32: 'asdf' },
        default_title: 'title',
        default_popup: 'popup.html',
      },
      icons: {
        16: 'assets/favicon-16.png',
        48: 'assets/favicon-48.png',
        128: 'assets/favicon-128.png',
      },
      background: { service_worker: './static/js/background.js' },
    };
    const expected = /element must be string/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test(`should throw error when permissions's each element is not empty in the string`, async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: [''],
      content_scripts: [
        {
          matches: ['asdf'],
          css: ['asdf'],
          js: ['asdf'],
        },
      ],
      action: {
        default_icon: { 16: 'asdf', 24: 'asdf', 32: 'asdf' },
        default_title: 'title',
        default_popup: 'popup.html',
      },
      icons: {
        16: 'assets/favicon-16.png',
        48: 'assets/favicon-48.png',
        128: 'assets/favicon-128.png',
      },
      background: { service_worker: './static/js/background.js' },
    };
    const expected = /element can't be empty in the string/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test(`should throw error when action, icons and background is not object`, async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [
        {
          matches: ['asdf'],
          css: ['asdf'],
          js: ['asdf'],
        },
      ],
      icons: [],
      action: {},
      background: {},
    };
    const expected = /must be object/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test(`should throw error when background's property do not have service_worker`, async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [
        {
          matches: ['asdf'],
          css: ['asdf'],
          js: ['asdf'],
        },
      ],
      background: { asdf: '' },
      action: {},
      icons: {},
    };
    const expected = /must have property of service_worker/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test(`should throw error when background's property of service_worker is not string`, async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [
        {
          matches: ['asdf'],
          css: ['asdf'],
          js: ['asdf'],
        },
      ],
      background: { service_worker: 4 },
      action: {},
      icons: {},
    };
    const expected = /must be string/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test(`should throw error when background's property of service_worker's value is empty in the string`, async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [
        {
          matches: ['asdf'],
          css: ['asdf'],
          js: ['asdf'],
        },
      ],
      background: { service_worker: '' },
      action: {},
      icons: {},
    };
    const expected = /can't be empty in the string/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test(`should throw error when action's properties do not have default_icon, default_title, and default_popup`, async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [
        {
          matches: ['asdf'],
          css: ['asdf'],
          js: ['asdf'],
        },
      ],
      background: { service_worker: 'background.js' },
      action: { asdf: '' },
      icons: {},
    };
    const expected =
      /must have properties of default_icon, default_title, and default_popup/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test(`should throw error when action's properties of default_title, and default_popup is not string`, async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [
        {
          matches: ['asdf'],
          css: ['asdf'],
          js: ['asdf'],
        },
      ],
      background: { service_worker: 'background.js' },
      action: { default_icon: {}, default_title: 4, default_popup: {} },
      icons: {},
    };
    const expected = /must be string/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test(`should throw error when action's properties of default_title, and default_popup is not empty in the string`, async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [
        {
          matches: ['asdf'],
          css: ['asdf'],
          js: ['asdf'],
        },
      ],
      background: { service_worker: 'background.js' },
      action: {
        default_icon: {},
        default_title: '',
        default_popup: '',
      },
      icons: {},
    };
    const expected = /can't be empty in the string/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test(`should throw error when action's property of default_icon is not object`, async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [
        {
          matches: ['asdf'],
          css: ['asdf'],
          js: ['asdf'],
        },
      ],
      background: { service_worker: 'background.js' },
      action: {
        default_icon: [],
        default_title: '',
        default_popup: '',
      },
      icons: {},
    };
    const expected = /can't be empty in the string/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test(`should throw error when action's property of default_icon's property of 16, 24, and 32`, async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [
        {
          matches: ['asdf'],
          css: ['asdf'],
          js: ['asdf'],
        },
      ],
      background: { service_worker: 'background.js' },
      action: {
        default_icon: { asdf: '' },
        default_title: 'title',
        default_popup: 'popup.html',
      },
      icons: {},
    };
    const expected =
      /default_icon's properties must have 16, 24, 32 in the key/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test(`should throw error when action's property of default_icon's value is not string`, async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [
        {
          matches: ['asdf'],
          css: ['asdf'],
          js: ['asdf'],
        },
      ],
      background: { service_worker: 'background.js' },
      action: {
        default_icon: { 16: 4, 24: '', 32: [] },
        default_title: 'title',
        default_popup: 'popup.html',
      },
      icons: {},
    };
    const expected = /must be string/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test(`should throw error when action's property of default_icon's value is not empty in the string`, async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [
        {
          matches: ['asdf'],
          css: ['asdf'],
          js: ['asdf'],
        },
      ],
      background: { service_worker: 'background.js' },
      action: {
        default_icon: { 16: '4', 24: '', 32: '' },
        default_title: 'title',
        default_popup: 'popup.html',
      },
      icons: {},
    };
    const expected = /can't be empty in the string/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test(`should throw error when icons' properties do not have 16, 48 and 128`, async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [
        {
          matches: ['asdf'],
          css: ['asdf'],
          js: ['asdf'],
        },
      ],
      background: { service_worker: 'background.js' },
      action: {
        default_icon: { 16: 'asdf', 24: 'asdf', 32: 'asdf' },
        default_title: 'title',
        default_popup: 'popup.html',
      },
      icons: { asdf: '' },
    };
    const expected = /icons' properties must have 16, 48, and 128 in the key/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test(`should throw error when icons' value is not string`, async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [
        {
          matches: ['asdf'],
          css: ['asdf'],
          js: ['asdf'],
        },
      ],
      background: { service_worker: 'background.js' },
      action: {
        default_icon: { 16: 'asdf', 24: 'asdf', 32: 'asdf' },
        default_title: 'title',
        default_popup: 'popup.html',
      },
      icons: { 16: 4, 48: {}, 128: [] },
    };
    const expected = /must be string/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test(`should throw error when icons' value is not empty in the string`, async () => {
    const input = {
      name: 'title',
      description: 'description',
      options_page: 'options.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [
        {
          matches: ['asdf'],
          css: ['asdf'],
          js: ['asdf'],
        },
      ],
      background: { service_worker: 'background.js' },
      action: {
        default_icon: { 16: 'asdf', 24: 'asdf', 32: 'asdf' },
        default_title: 'title',
        default_popup: 'popup.html',
      },
      icons: { 16: '', 48: '', 128: '' },
    };
    const expected = /can't be empty in the string/;
    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));
    await expect(createManifestFile()).rejects.toThrowError(expected);
  });
  test('should get resolve when manifest.config.json data is correct', async () => {
    const input = {
      name: 'title',
      description: 'just description',
      options_page: 'asdf.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [
        {
          matches: ['*://*.netflix.com/*'],
          css: ['./static/css/contentScript.css'],
          js: ['./static/js/contentScript.js'],
        },
      ],
      action: {
        default_icon: {
          16: 'assets/favicon-16.png',
          24: 'assets/favicon-24.png',
          32: 'assets/favicon-32.png',
        },
        default_popup: 'popup.html',
        default_title: 'Open the popup',
      },
      icons: {
        16: 'assets/favicon-16.png',
        48: 'assets/favicon-48.png',
        128: 'assets/favicon-128.png',
      },
      background: {
        service_worker: './static/js/background.js',
      },
    };

    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));

    await expect(createManifestFile()).resolves.toBe('manifest.json created');
  });
  test(`should have manifest.json file when it got created`, async () => {
    const input = {
      name: 'title',
      description: 'just description',
      options_page: 'asdf.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [
        {
          matches: ['*://*.netflix.com/*'],
          css: ['./static/css/contentScript.css'],
          js: ['./static/js/contentScript.js'],
        },
      ],
      action: {
        default_icon: {
          16: 'assets/favicon-16.png',
          24: 'assets/favicon-24.png',
          32: 'assets/favicon-32.png',
        },
        default_popup: 'popup.html',
        default_title: 'Open the popup',
      },
      icons: {
        16: 'assets/favicon-16.png',
        48: 'assets/favicon-48.png',
        128: 'assets/favicon-128.png',
      },
      background: {
        service_worker: './static/js/background.js',
      },
    };

    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));

    await expect(createManifestFile()).resolves.toBe('manifest.json created');

    // get manifest json file and check if it is exist.

    expect(await afs.access(manifestJsonFilename)).toBeUndefined();

    // remove manifest json
    await afs.unlink(manifestJsonFilename);
  });
  test(`should not have content script css in the manifest.json during development env`, async () => {
    process.env = {
      ...originalEnv,
      NODE_ENV: 'development',
    };
    const input = {
      name: 'title',
      description: 'just description',
      options_page: 'asdf.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [
        {
          matches: ['*://*.netflix.com/*'],
          css: ['./static/css/contentScript.css'],
          js: ['./static/js/contentScript.js'],
        },
      ],
      action: {
        default_icon: {
          16: 'assets/favicon-16.png',
          24: 'assets/favicon-24.png',
          32: 'assets/favicon-32.png',
        },
        default_popup: 'popup.html',
        default_title: 'Open the popup',
      },
      icons: {
        16: 'assets/favicon-16.png',
        48: 'assets/favicon-48.png',
        128: 'assets/favicon-128.png',
      },
      background: {
        service_worker: './static/js/background.js',
      },
    };

    const expected = {
      content_scripts: [
        {
          matches: ['*://*.netflix.com/*'],
          js: ['./static/js/contentScript.js'],
        },
      ],
    };

    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));

    await expect(createManifestFile()).resolves.toBe('manifest.json created');
    // get manifest json file and check if it is exist.
    expect(await afs.access(manifestJsonFilename)).toBeUndefined();

    const result = JSON.parse(await afs.readFile(manifestJsonFilename, 'utf8'));

    expect(result).toEqual(expect.objectContaining(expected));

    // remove manifest json
    await afs.unlink(manifestJsonFilename);
  });
  test(`should have content script css in the manifest.json during production env`, async () => {
    process.env = {
      ...originalEnv,
      NODE_ENV: 'production',
    };
    const input = {
      name: 'title',
      description: 'just description',
      options_page: 'asdf.html',
      manifest_version: 3,
      permissions: [],
      content_scripts: [
        {
          matches: ['*://*.netflix.com/*'],
          css: ['./static/css/contentScript.css'],
          js: ['./static/js/contentScript.js'],
        },
      ],
      action: {
        default_icon: {
          16: 'assets/favicon-16.png',
          24: 'assets/favicon-24.png',
          32: 'assets/favicon-32.png',
        },
        default_popup: 'popup.html',
        default_title: 'Open the popup',
      },
      icons: {
        16: 'assets/favicon-16.png',
        48: 'assets/favicon-48.png',
        128: 'assets/favicon-128.png',
      },
      background: {
        service_worker: './static/js/background.js',
      },
    };

    const expected = {
      content_scripts: [
        {
          matches: ['*://*.netflix.com/*'],
          css: ['./static/css/contentScript.css'],
          js: ['./static/js/contentScript.js'],
        },
      ],
    };

    await afs.writeFile(manifestConfigFilename, JSON.stringify(input));

    await expect(createManifestFile()).resolves.toBe('manifest.json created');
    // get manifest json file and check if it is exist.
    expect(await afs.access(manifestJsonFilename)).toBeUndefined();

    const result = JSON.parse(await afs.readFile(manifestJsonFilename, 'utf8'));

    expect(result).toEqual(expect.objectContaining(expected));

    // remove manifest json
    await afs.unlink(manifestJsonFilename);
  });
});
