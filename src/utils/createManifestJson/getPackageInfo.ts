import afs from 'fs/promises';
import path from 'path';

export const error = {
  fileRequired: 'package.json is not exist. package.json file is required',
  fileExistEmpty: 'package.json is exist but empty. information is required!',
  objectEmpty: 'Object is empty. information is required!',
  objectRequired: 'object is required in the package.json',
  versionRequired: 'version property is required in the package.json',
};

const getPackageInfo = async (
  filename: string = `${path.resolve('./')}/package.json`
) => {
  try {
    // check if package.json is exist. if not. it will throw error in the catch
    await afs.access(filename);

    // get data from package.json file
    const dataStr = await afs.readFile(filename, 'utf8');

    // check and throw error when it is empty string.
    if (!dataStr) {
      throw new Error(error.fileExistEmpty);
    }

    const dataObj = JSON.parse(dataStr);

    // check and throw error when it is not object.
    if (Object.prototype.toString.call(dataObj) !== '[object Object]') {
      throw new Error(error.objectRequired);
    }

    // check and throw error when object is empty
    if (Object.keys(dataObj).length === 0) {
      throw new Error(error.objectEmpty);
    }

    // check and throw error when it do not have version property
    if (!dataObj.hasOwnProperty('version')) {
      throw new Error(error.versionRequired);
    }

    return dataObj;
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      // package.json file is not exist!
      throw new Error(error.fileRequired);
    }

    throw err; // this code will be reject
  }
};

export default getPackageInfo;
