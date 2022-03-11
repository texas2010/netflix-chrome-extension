import afs from 'fs/promises';
import path from 'path';

import createManifestFile, { error } from './createManifestFile';

describe('createManifestFile function', () => {
  test('should throw error when manifest.config.json is not exist', async () => {
    const filename = `${path.resolve('./fake-test')}/manifest.config.json`;
    const expected = error.fileRequired;

    await expect(createManifestFile(filename)).rejects.toThrowError(expected);
  });
  test('should throw error when manifest.config.json is exist but empty', async () => {
    const filename = `${path.resolve('./fake-test')}/manifest.config.json`;
    const input = '';
    const expected = error.fileExistEmpty;

    await afs.writeFile(filename, input);

    await expect(createManifestFile(filename)).rejects.toThrowError(expected);

    await afs.unlink(filename);
  });
  test('should throw error when it is not object in the manifest.config.json', async () => {
    const filename = `${path.resolve('./fake-test')}/manifest.config.json`;
    const input: any[] = [];
    const expected = error.objectRequired;

    await afs.writeFile(filename, JSON.stringify(input));

    await expect(createManifestFile(filename)).rejects.toThrowError(expected);

    await afs.unlink(filename);
  });
  test('should throw error when object is empty in the manifest.config.json', async () => {
    const filename = `${path.resolve('./fake-test')}/manifest.config.json`;
    const input = {};
    const expected = error.objectEmpty;

    await afs.writeFile(filename, JSON.stringify(input));

    await expect(createManifestFile(filename)).rejects.toThrowError(expected);

    await afs.unlink(filename);
  });
  test('should throw error when object do not have correct property', async () => {
    const filename = `${path.resolve('./fake-test')}/manifest.config.json`;
    const input = { asdf: '', fdsa: 4, name: 'test' };
    const expected = error.objectWrongProperty;

    await afs.writeFile(filename, JSON.stringify(input));

    await expect(createManifestFile(filename)).rejects.toThrowError(expected);

    await afs.unlink(filename);
  });
  test('should throw error when name, description, and options_page is not string', async () => {
    const filename = `${path.resolve('./fake-test')}/manifest.config.json`;
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
    await afs.writeFile(filename, JSON.stringify(input));
    await expect(createManifestFile(filename)).rejects.toThrowError(expected);
    await afs.unlink(filename);
  });
  test('should throw error when name, description, and options_page string is empty', async () => {
    const filename = `${path.resolve('./fake-test')}/manifest.config.json`;
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
    await afs.writeFile(filename, JSON.stringify(input));
    await expect(createManifestFile(filename)).rejects.toThrowError(expected);
    await afs.unlink(filename);
  });
  test('should throw error when manifest_version is not number', async () => {
    const filename = `${path.resolve('./fake-test')}/manifest.config.json`;
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
    await afs.writeFile(filename, JSON.stringify(input));
    await expect(createManifestFile(filename)).rejects.toThrowError(expected);
    await afs.unlink(filename);
  });
  test('should throw error when permissions and content_scripts is not array', async () => {
    const filename = `${path.resolve('./fake-test')}/manifest.config.json`;
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
    await afs.writeFile(filename, JSON.stringify(input));
    await expect(createManifestFile(filename)).rejects.toThrowError(expected);
    await afs.unlink(filename);
  });
  test(`should throw error when content_scripts' array is empty`, async () => {
    const filename = `${path.resolve('./fake-test')}/manifest.config.json`;
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
    await afs.writeFile(filename, JSON.stringify(input));
    await expect(createManifestFile(filename)).rejects.toThrowError(expected);
    await afs.unlink(filename);
  });
  test(`should throw error when content_scripts' array's element don't have object`, async () => {
    const filename = `${path.resolve('./fake-test')}/manifest.config.json`;
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
    await afs.writeFile(filename, JSON.stringify(input));
    await expect(createManifestFile(filename)).rejects.toThrowError(expected);
    await afs.unlink(filename);
  });
  test(`should throw error when content_scripts' array's each object's properties do not have matches, css and js`, async () => {
    const filename = `${path.resolve('./fake-test')}/manifest.config.json`;
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
    await afs.writeFile(filename, JSON.stringify(input));
    await expect(createManifestFile(filename)).rejects.toThrowError(expected);
    await afs.unlink(filename);
  });
  test(`should throw error when content_scripts' array's each object's values is not array`, async () => {
    const filename = `${path.resolve('./fake-test')}/manifest.config.json`;
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
    await afs.writeFile(filename, JSON.stringify(input));
    await expect(createManifestFile(filename)).rejects.toThrowError(expected);
    await afs.unlink(filename);
  });
  test(`should throw error when content_scripts' array's each object's values' element is empty`, async () => {
    const filename = `${path.resolve('./fake-test')}/manifest.config.json`;
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
    await afs.writeFile(filename, JSON.stringify(input));
    await expect(createManifestFile(filename)).rejects.toThrowError(expected);
    await afs.unlink(filename);
  });
  test(`should throw error when content_scripts' array's each object's values' element is not string`, async () => {
    const filename = `${path.resolve('./fake-test')}/manifest.config.json`;
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
    await afs.writeFile(filename, JSON.stringify(input));
    await expect(createManifestFile(filename)).rejects.toThrowError(expected);
    await afs.unlink(filename);
  });
  test(`should throw error when content_scripts' array's each object's values' element string can't be empty`, async () => {
    const filename = `${path.resolve('./fake-test')}/manifest.config.json`;
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
    await afs.writeFile(filename, JSON.stringify(input));
    await expect(createManifestFile(filename)).rejects.toThrowError(expected);
    await afs.unlink(filename);
  });
  test(`should throw error when action, icons and background is not object`, async () => {
    const filename = `${path.resolve('./fake-test')}/manifest.config.json`;
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
      action: {},
      icons: [],
      background: {},
    };
    const expected = /must be object/;
    await afs.writeFile(filename, JSON.stringify(input));
    await expect(createManifestFile(filename)).rejects.toThrowError(expected);
    await afs.unlink(filename);
  });
  test(`should throw error when background's property do not have service_worker`, async () => {
    const filename = `${path.resolve('./fake-test')}/manifest.config.json`;
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
    await afs.writeFile(filename, JSON.stringify(input));
    await expect(createManifestFile(filename)).rejects.toThrowError(expected);
    await afs.unlink(filename);
  });
  test(`should throw error when background's property of service_worker is not string`, async () => {
    const filename = `${path.resolve('./fake-test')}/manifest.config.json`;
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
    await afs.writeFile(filename, JSON.stringify(input));
    await expect(createManifestFile(filename)).rejects.toThrowError(expected);
    await afs.unlink(filename);
  });
  test(`should throw error when background's property of service_worker's value is empty in the string`, async () => {
    const filename = `${path.resolve('./fake-test')}/manifest.config.json`;
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
    await afs.writeFile(filename, JSON.stringify(input));
    await expect(createManifestFile(filename)).rejects.toThrowError(expected);
    await afs.unlink(filename);
  });

  test('should get resolve when information is correct', async () => {
    const filename = `${path.resolve('./fake-test')}/manifest.config.json`;
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
        default_popup: 'popup.html',
        default_title: 'Open the popup',
      },
      icons: {
        '16': 'assets/favicon-16.png',
        '48': 'assets/favicon-48.png',
        '128': 'assets/favicon-128.png',
      },
      background: {
        service_worker: './static/js/background.js',
      },
    };

    await afs.writeFile(filename, JSON.stringify(input));

    await expect(createManifestFile(filename)).resolves.toBeTruthy();

    await afs.unlink(filename);
  });
});
