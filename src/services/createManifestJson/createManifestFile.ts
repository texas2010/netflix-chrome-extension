import afs from 'fs/promises';
import path from 'path';

import { getPackageInfo } from './getPackageInfo';

type DefaultIconObjType = {
  16: string;
  24: string;
  32: string;
};

type IconsObjType = {
  16: string;
  48: string;
  128: string;
};

type ContentScriptsObjType = {
  matches: string[];
  css: string[];
  js: string[];
};

interface ManifestConfigI {
  name: string;
  description: string;
  version: string;
  manifest_version: number;
  action: {
    default_icon: DefaultIconObjType;
    default_popup: string;
    default_title: string;
  };
  content_scripts: ContentScriptsObjType[];
  permissions: string[];
  icons: IconsObjType;
  options_page: string;
  background: {
    service_worker: string;
  };
}

export const error = {
  fileRequired:
    'manifest.config.json is not exist. it is required to have a file',
  fileExistEmpty:
    'manifest.config.json file is empty. it must have information.',
  objectEmpty:
    'Object is empty. it must have properties. properties: name, description, manifest_version, action, content_scripts, permissions, icons, options_page, background!',
  objectRequired: 'object is required in the manifest.config.json file',
  objectWrongProperty:
    'property need to be correct. properties: name, description, manifest_version, action, content_scripts, permissions, icons, options_page, background',
};

const allPropArr = [
  'name',
  'description',
  'manifest_version',
  'action',
  'content_scripts',
  'permissions',
  'icons',
  'options_page',
  'background',
];

export const createManifestFile = async () => {
  // check if node_env is not exist.
  if (!process.env.NODE_ENV) {
    throw new Error('NODE_ENV is not exist. it is required to have');
  }
  // check if TEST_BUILD_PATH is not exist during test env
  if (process.env.TEST_NODE_ENV && !process.env.TEST_BUILD_PATH) {
    throw new Error(
      'TEST_BUILD_PATH is not exist in the test env file. it is required to have'
    );
  }

  const buildPath = process.env.TEST_NODE_ENV
    ? (process.env.TEST_BUILD_PATH as string)
    : './';
  const configFilename = `${path.resolve(buildPath)}/manifest.config.json`;
  try {
    //check if manifest.config.json is exist
    await afs.access(configFilename);

    // get data from manifest.config.json file
    const dataStr = await afs.readFile(configFilename, 'utf8');

    // check and throw error when it is empty string.
    if (!dataStr) {
      throw new Error(error.fileExistEmpty);
    }

    const dataObj: ManifestConfigI = JSON.parse(dataStr);

    // check and throw error when it is not object.
    if (Object.prototype.toString.call(dataObj) !== '[object Object]') {
      throw new Error(error.objectRequired);
    }

    // check and throw error when object is empty
    if (Object.keys(dataObj).length === 0) {
      throw new Error(error.objectEmpty);
    }

    // check and throw error when it is not exist.
    // name, description, manifest_version, action, content_scripts, permissions, icons, options_page, background
    if (!allPropArr.every((prop) => prop in dataObj)) {
      throw new Error(error.objectWrongProperty);
    }

    // check manifest config file
    for (const dataKey in dataObj) {
      switch (dataKey) {
        case 'description':
        case 'name':
        case 'options_page':
          // check and make sure it is string.
          if (typeof dataObj[dataKey] !== 'string') {
            throw new Error(`${dataKey} must be string.`);
          }

          // check and make sure it is not empty
          if (!dataObj[dataKey]) {
            throw new Error(`${dataKey} can't be empty.`);
          }

          break;
        case 'manifest_version':
          // check and make sure it is number.
          if (typeof dataObj[dataKey] !== 'number') {
            throw new Error(`${dataKey} must be number.`);
          }

          break;
        case 'content_scripts':
        case 'permissions':
          // check and make sure it is array
          if (
            Object.prototype.toString.call(dataObj[dataKey]) !==
            '[object Array]'
          ) {
            throw new Error(`${dataKey} must be array`);
          }

          // check content_scripts data
          if (dataKey === 'content_scripts') {
            const contentScriptsArr = dataObj['content_scripts'];

            // check and make sure something is exist in the array! if zero then it will throw the error.
            if (!contentScriptsArr.length) {
              throw new Error(`${dataKey}' array can't be empty.`);
            }

            // check each element in the content scripts array
            for (const contentScriptsArrObj of contentScriptsArr) {
              // check and make sure it is object.
              if (
                Object.prototype.toString.call(contentScriptsArrObj) !==
                '[object Object]'
              ) {
                throw new Error(
                  `content_scripts' array must have object in the each element.`
                );
              }

              // check object's properties. it must have matches, css and js properties
              if (
                !['matches', 'css', 'js'].every(
                  (prop) => prop in contentScriptsArrObj
                )
              ) {
                throw new Error(
                  `content_scripts' each object's properties must be matches, css and js`
                );
              }

              // check each property in the contentScriptsArrObj.
              for (const contentScriptsArrObjKey in contentScriptsArrObj) {
                const contentScriptsArrObjArr =
                  contentScriptsArrObj[
                    contentScriptsArrObjKey as keyof ContentScriptsObjType
                  ];

                // check contentScriptsArrObjArr and make sure it is only array.
                if (
                  Object.prototype.toString.call(contentScriptsArrObjArr) !==
                  '[object Array]'
                ) {
                  throw new Error(`${contentScriptsArrObjKey} must be array`);
                }

                // check and make sure something is exist in the array. if zero then throw error.
                if (!contentScriptsArrObjArr.length) {
                  throw new Error(
                    `${contentScriptsArrObjKey}'s array can't be empty.`
                  );
                }

                // check each element in the contentScriptsArrObjArr
                for (const contentScriptsArrObjArrElement of contentScriptsArrObjArr) {
                  // check element in the array and make sure it is only string.
                  if (typeof contentScriptsArrObjArrElement !== 'string') {
                    throw new Error(
                      `${contentScriptsArrObjKey}'s array's element must be string.`
                    );
                  }

                  // check element and make sure string is not empty at all.
                  if (!contentScriptsArrObjArrElement) {
                    throw new Error(
                      `${contentScriptsArrObjKey}'s array's element string can't be empty.`
                    );
                  }
                }

                // end loop contentScriptsArrObj
              }

              // end loop contentScriptsArr
            }
          }

          // check permissions data
          if (dataKey === 'permissions') {
            const permissionsArr = dataObj['permissions'];

            // check each element in the array if something is exist in the array.
            if (permissionsArr.length > 0) {
              for (const element of permissionsArr) {
                if (typeof element !== 'string') {
                  throw new Error(`${dataKey}' element must be string`);
                }
                if (!element) {
                  throw new Error(
                    `${dataKey}' element can't be empty in the string`
                  );
                }
              }
            }
          }
          break;
        case 'host_permissions':
          break;
        case 'action':
        case 'background':
        case 'icons':
          // check and make sure it is only object.
          if (
            Object.prototype.toString.call(dataObj[dataKey]) !==
            '[object Object]'
          ) {
            throw new Error(`${dataKey} must be object`);
          }

          // check action data
          if (dataKey === 'action') {
            const actionObj = dataObj['action'];

            // check and make sure properties is exist. default_icon, default_title, default_popup
            if (
              !['default_icon', 'default_title', 'default_popup'].every(
                (prop) => prop in actionObj
              )
            ) {
              throw new Error(
                `${dataKey} must have properties of default_icon, default_title, and default_popup`
              );
            }

            // check and make sure it is string in the default_title and default_popup
            if (
              typeof actionObj['default_title'] !== 'string' ||
              typeof actionObj['default_popup'] !== 'string'
            ) {
              throw new Error(
                `${dataKey}'s properties of default_title and default_popup must be string`
              );
            }

            // check and make sure default_title and default_popup string is not empty
            if (!actionObj['default_title'] || !actionObj['default_popup']) {
              throw new Error(
                `${dataKey}'s properties of default_title and default_popup value can't be empty in the string`
              );
            }

            // check and make sure default_icon is object.
            if (
              Object.prototype.toString.call(actionObj['default_icon']) !==
              '[object Object]'
            ) {
              throw new Error(
                `${dataKey}'s properties of default_icon must be string`
              );
            }

            // check and make sure default_icon's properties is exist.
            if (
              ![16, 24, 32].every((prop) => prop in actionObj['default_icon'])
            ) {
              throw new Error(
                `default_icon's properties must have 16, 24, 32 in the key`
              );
            }

            // check each property in the loop from object
            const defaultIconObj = actionObj['default_icon'];
            for (const numKey in defaultIconObj) {
              const defaultIconValue =
                defaultIconObj[numKey as unknown as keyof DefaultIconObjType];

              // check and make sure default_icon's value must be string
              if (typeof defaultIconValue !== 'string') {
                throw new Error(
                  `default_icon's ${numKey}'s value must be string`
                );
              }

              // check and make sure default_icon's value string is not empty
              if (!defaultIconValue) {
                throw new Error(
                  `default_icon's ${numKey} can't be empty in the string.`
                );
              }
            }
          }

          // check background data
          if (dataKey === 'background') {
            const backgroundObj = dataObj['background'];

            // check and make sure property is exist. service_worker
            if (!['service_worker'].every((prop) => prop in backgroundObj)) {
              throw new Error(
                `${dataKey} must have property of service_worker`
              );
            }

            // check and make sure it is string in the property of service_worker
            if (typeof backgroundObj['service_worker'] !== 'string') {
              throw new Error(
                `${dataKey}'s property of service_worker must be string`
              );
            }

            // check and make sure it is not empty in the property of service_worker
            if (!backgroundObj['service_worker']) {
              throw new Error(
                `${dataKey}'s property of service_worker's value can't be empty in the string`
              );
            }
          }

          // check icons data
          if (dataKey === 'icons') {
            const iconsObj = dataObj['icons'];

            // check and make sure icons have properties of 16, 48, and 128 in the key
            if (![16, 48, 128].every((prop) => prop in iconsObj)) {
              throw new Error(
                `icons' properties must have 16, 48, and 128 in the key`
              );
            }

            // check each properties in the loop from object.
            for (const numKey in iconsObj) {
              const iconsObjValue =
                iconsObj[numKey as unknown as keyof IconsObjType];

              // check and make sure icons' values is string.
              if (typeof iconsObjValue !== 'string') {
                throw new Error(
                  `default_icon's ${numKey}'s value must be string`
                );
              }

              // check and make sure icons' values is not empty in the string.
              if (!iconsObjValue) {
                throw new Error(
                  `default_icon's ${numKey} can't be empty in the string.`
                );
              }
            }
          }

          break;
        default:
          throw new Error(`${dataKey} is not suppose to be in the object!`);
      }
    } // end of check manifest config data

    const packageInfo = await getPackageInfo();
    const newContentScriptsArr = dataObj.content_scripts.map((obj) => {
      const { matches, js } = obj;
      return process.env.NODE_ENV === 'development'
        ? {
            matches,
            js,
          }
        : obj;
    });

    const newManifestObj = {
      ...dataObj,
      version: packageInfo.version,
      content_scripts: newContentScriptsArr,
    };

    const buildFilename = process.env.TEST_NODE_ENV
      ? `${path.resolve(process.env.TEST_BUILD_PATH as string)}/manifest.json`
      : `${path.resolve('./')}/build/manifest.json`;

    await afs.writeFile(buildFilename, JSON.stringify(newManifestObj));

    return 'manifest.json created';
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      // manifest.config.json file is not exist!
      throw new Error(error.fileRequired);
    }

    throw err;
  }
};
