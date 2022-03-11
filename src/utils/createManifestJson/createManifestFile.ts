import afs from 'fs/promises';
import path from 'path';
// import getPackageInfo from './getPackageInfo';

type contentScriptsArrPropType = {
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
    default_popup: string;
    default_title: string;
  };
  content_scripts: contentScriptsArrPropType[];
  permissions: string[];
  icons: {
    16: string;
    48: string;
    128: string;
  };
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

const createManifestFile = async (
  filename: string = `${path.resolve('./')}/manifest.config.json`
) => {
  try {
    //check if manifest.config.json is exist
    await afs.access(filename);

    // get data from manifest.config.json file
    const dataStr = await afs.readFile(filename, 'utf8');

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
                    contentScriptsArrObjKey as keyof contentScriptsArrPropType
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
          }
          break;
        default:
          throw new Error(`${dataKey} is not suppose to be in the object!`);
      }
    }

    // const packageInfo = await getPackageInfo();
    // if (!packageInfo) return;
    // if (!packageInfo.version) {
    //   throw new Error('in the Package.json, version is missing!');
    // }
    // const newManifestObj = { ...manifestObj, version: packageInfo.version };
    // await afs.writeFile(`${path.resolve('./')}/build/manifest.json`, JSON.stringify(newManifestObj));
    return true;
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      // package.json file is not exist!
      throw new Error(error.fileRequired);
    }

    throw err;
  }
};

export default createManifestFile;
