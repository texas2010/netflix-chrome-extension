import afs from 'fs/promises';
import path from 'path';

export const error = {
  packageRequired: 'package.json is not exist. package.json file is required',
  packageExistEmpty:
    'package.json is exist but empty. it must have information!',
  packageObjectEmpty: 'Object is empty. it must have information!',
  packageObjectRequired: 'object is required in the package.json',
  packageVersionRequired: 'version property is required in the package.json',
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
      throw new Error(error.packageExistEmpty);
    }

    const dataObj = JSON.parse(dataStr);

    // check and throw error when it is not object.
    if (Object.prototype.toString.call(dataObj) !== '[object Object]') {
      throw new Error(error.packageObjectRequired);
    }

    // check and throw error when object is empty
    if (Object.keys(dataObj).length === 0) {
      throw new Error(error.packageObjectEmpty);
    }

    // check and throw error when it do not have version property
    if (!dataObj.hasOwnProperty('version')) {
      throw new Error(error.packageVersionRequired);
    }

    return dataObj;
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      // package.json file is not exist!
      throw new Error(error.packageRequired);
    }

    return Promise.reject(err);
  }
};

export default getPackageInfo;
